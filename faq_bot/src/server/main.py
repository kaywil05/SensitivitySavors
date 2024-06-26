from fastapi import Request, FastAPI, Form, Response
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from contextlib import asynccontextmanager
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import os
from model import load_all_models

os.environ["HF_HOME"] = "../../huggingface_cache/model_cache"
os.environ["HF_DATASETS_CACHE"] = "../../huggingface_cache/data_cache"


class QItem(BaseModel):
    question: str


class PredictionAnswer(BaseModel):
    score: float
    question: str
    answer: str


faq_model = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global faq_model
    faq_model = load_all_models()
    yield
    print("Shutting down the model...")


app = FastAPI(lifespan=lifespan)
app.mount("/backend", StaticFiles(directory="../../../backend/public"), name="static")
templates = Jinja2Templates(directory="../../../backend/views/pages")


@app.post("/query")
# async def handle_question(question: str = Form(...)) -> dict:
async def handle_question(request: Request) -> dict:
    async with request.form() as form:
        question = form.get("question")
        print(question)
    # return {"hello": "world"}
    # print(question)
    pred = faq_model.get_answer(question)
    print(pred)
    # return {
    #     "score": pred["Score"],
    #     "question": pred["Question"],
    #     "answer": pred["Answer"],
    # }
    return templates.TemplateResponse(
        name="q_a_chat.html",
        context={
            "request": request,
            "question": question,
            "pred": {
                "score": pred["Score"],
                "question": pred["Question"],
                "answer": pred["Answer"],
            },
        },
    )


# @app.post("/query")
# async def handle_question(req: Request) -> dict:
#     qItem = await req.json()
#     print(qItem)
#     pred = faq_model.get_answer(qItem["question"])
#     print(pred)
#     return {
#         "score": pred["Score"],
#         "question": pred["Question"],
#         "answer": pred["Answer"],
#     }


# @app.post("/get_answer/")
# async def get_body(request: QItem):
#     q = request.question
#     a = faq_model.get_answer(q)
#     return a
