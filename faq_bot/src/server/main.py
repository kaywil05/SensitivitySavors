from fastapi import Request, FastAPI
from pydantic import BaseModel
from contextlib import asynccontextmanager
import os
from model import load_all_models
os.environ['TRANSFORMERS_CACHE'] = '../../huggingface_cache/model_cache'
os.environ['HF_DATASETS_CACHE'] = '../../huggingface_cache/data_cache'




class QItem(BaseModel):
    question: str
    

faq_model = None



@asynccontextmanager
async def lifespan(app: FastAPI):
    global faq_model
    faq_model = load_all_models()
    yield
    print('Shutting down the model...')

app = FastAPI(lifespan=lifespan)

@app.get("/")
def root():
    return {"message": "Hello World"}

@app.get("/{question}")
def handle_question(question: str):
    return {'answer': "My name is Phuong."}


@app.post("/get_answer/")
async def get_body(request: QItem):
    q = request.question

    a = faq_model.get_answer(q)
   
    return a


