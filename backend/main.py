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
@app.get("/api/drought")
def get_drought_metrics():
    return {
        "pdsi": -3.2,
        "drought_level": "D2",
        "snowpack_pct": 61.0,
        "canal_fill_pct": 42.0,
        "water_alloc_pct": 0.0
    }


@app.get("/api/reservoirs")
def get_reservoirs():
    return [
        {"name": "Millerton Lake", "fill_pct": 54},
        {"name": "Pine Flat Lake", "fill_pct": 38},
        {"name": "San Luis Reservoir", "fill_pct": 69}
    ]