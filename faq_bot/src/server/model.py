
import re
import os
import torch
from sentence_transformers import SentenceTransformer
from transformers import pipeline
import pandas as pd
import numpy as np
from pathlib import Path

os.environ['TRANSFORMERS_CACHE'] = '../huggingface_cache/model_cache'
os.environ['HF_DATASETS_CACHE'] = '../huggingface_cache/data_cache'


def load_data():
    data_path = Path("../../data/pairs1.csv")
    data = pd.read_csv(data_path, index_col='Unnamed: 0')
    data.head()
    return data


def remove_number_start(sentence):
    return re.sub('[0-9]+\.\ ', '', sentence)


DEVICE = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
# DEVICE = torch.device('cpu')

class FAQBot:
    def __init__(
        self, 
        qa_model,
        general_model,
        database: pd.DataFrame,
        threshold=0.8,
    ):
        self.qa_model = qa_model
        self.general_model = general_model
        self.database = database
        self.threshold = threshold


        self.q_embeddings = self.qa_model.encode(
            self.database['q'],
            device=DEVICE,
            convert_to_tensor=True,
        )

    def get_answer(self, question: str):
        user_qe = self.qa_model.encode(
            question,
            device=DEVICE,
            convert_to_tensor=True,
        )
        user_qe = user_qe.view(1, -1)
        calc_score = torch.nn.CosineSimilarity(dim=1, eps=1e-08)
        dists = calc_score(user_qe, self.q_embeddings)
        ans_idx = torch.argmax(dists).cpu().numpy()
        best_score = dists[ans_idx].item()
        result = {}
        if best_score >= self.threshold:
            result['Score'] = best_score
            result['Question'] = self.database['q'][ans_idx]
            result['Answer'] = self.database['a'][ans_idx]
        else:
            ans = self.general_model(question, do_sample=True, min_length=10, max_new_tokens=100)[0]
            result['Score'] = best_score
            result['Answer'] = ans['generated_text'].split('\n\n')[1]
        return result



def load_all_models():

    qa_model = SentenceTransformer('sentence-transformers/multi-qa-MiniLM-L6-cos-v1')
    general_model = pipeline('text-generation', model='EleutherAI/gpt-neo-1.3B', device=DEVICE)

    data = load_data()
    data['q'] = data['q'].apply(remove_number_start)

    faq_bot = FAQBot(
        qa_model=qa_model,
        general_model=general_model,
        database=data,
        threshold=0.6,
    )
    return faq_bot

# print(faq_bot.get_answer("What is your purpose?"))