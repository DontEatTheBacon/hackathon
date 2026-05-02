from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from ai import predict_crop

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
async def predict(crop_request: CropRequest):
    result = predict_crop(crop_request.crop)

    return { 
            'crop': crop_request.crop,
            'text': result
            }
