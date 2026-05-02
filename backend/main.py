from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from ai import predict_crop, get_top_crops

class CropRequest(BaseModel):
    crop: str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def index():
    return { 'message': 'Hello world!' }

@app.post('/predict')
def predict(crop_request: CropRequest):
    result = predict_crop(crop_request.crop)

    return { 
            'crop': crop_request.crop,
            'text': result
            }


@app.get('/top_crops')
def top_crops():
    result = get_top_crops()

    return result