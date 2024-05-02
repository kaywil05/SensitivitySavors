# FAQ Bot

## Requirements

- Install miniconda3 from the office [website](https://docs.anaconda.com/free/miniconda/index.html)
- Python 3.8, pytorch, transformers, sentence-transformers, pandas, uvicorn, pydantic fastapi
  
```shell
conda new torchenv python=3.8
conda activate torchenv
conda install pandas
conda install pytorch::pytorch torchvision torchaudio -c pytorch
pip install transformers sentence-transformers
pip install uvicorn[standard] fastapi pydantic
```

## How to run server

- Jump into directory `faq_bot/src/server`.
- Run command `uvicorn main:app --reload` in dev mode.
- Open browser with url `http://127.0.0.1:8000/docs` for testing API.

## Description

- The system answers users' questions about cuisine and healthy diet 
- The system contains a database of Questions and Answers about the cuisine and healthy diet.

## Ideas for solution

- The input questions of users will be mapped to the most similarity question existing in the database.
- The system uses sentence embedding model to encode user's questions to compare with existing questions in the database.
- Set threshole 0.6 to pick answer. if score < 0.6, pass question to general LM to generate answer.

## Data for database
csv file: each row corresponding a pair of question and answer

