from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
async def root():
    return { 'message': 'Hello World' }


@app.get('/test/{id}')
async def read_item(id):
    return { 'id': id }

@app.get('/test2/')
async def asdf(optional: int = 0):
    return { "you put": optional }

@app.post('/test3/')
async def fed(item: Item):
    return item