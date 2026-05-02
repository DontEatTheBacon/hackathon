from google import genai
from dotenv import load_dotenv

load_dotenv()

client = genai.Client()

def predict_crop(crop: str):
    WATER_DATA = [
    {"Date": "12/1/25", "Snowpack": 65, "Precip": 105, "Reservoir": 72},
    {"Date": "11/1/25", "Snowpack": 25, "Precip": 95, "Reservoir": 75},
    {"Date": "10/1/25", "Snowpack": 8, "Precip": 85, "Reservoir": 78},
    {"Date": "9/1/25", "Snowpack": 3, "Precip": 90, "Reservoir": 80},
    {"Date": "8/1/25", "Snowpack": 5, "Precip": 95, "Reservoir": 83},
    {"Date": "7/1/25", "Snowpack": 12, "Precip": 100, "Reservoir": 88},
    {"Date": "6/1/25", "Snowpack": 40, "Precip": 105, "Reservoir": 92},
    {"Date": "5/1/25", "Snowpack": 75, "Precip": 110, "Reservoir": 94},
    {"Date": "4/1/25", "Snowpack": 110, "Precip": 105, "Reservoir": 90},
    {"Date": "3/1/25", "Snowpack": 120, "Precip": 110, "Reservoir": 85},
    {"Date": "2/1/25", "Snowpack": 105, "Precip": 115, "Reservoir": 80},
    {"Date": "1/1/25", "Snowpack": 90, "Precip": 110, "Reservoir": 75},
]

    PROMPT = f"""
    You are an agricultural water advisory AI for California farmers.

    You are given historical water data including Snowpack, Precipitation, and Reservoir levels.

    Your job is to:
    1. Analyze water conditions from the dataset.
    2. Decide if the crop is suitable to grow.
    3. Respond with one of:
    - Suitable to grow 🌱
    - Possible but risky ⚠️
    - Not recommended 🚨
    4. If the input is not a valid crop, respond ONLY:
    "Please enter a valid crop name."

    ---

    DATASET:
    {str(WATER_DATA)}

    ---

    USER CROP:
    {crop}

    ---

    OUTPUT RULES:
    - Be concise
    - Mention water reasoning briefly
    - Always include recommendation label
    """
    response = client.models.generate_content(
        model='gemini-3.1-flash-lite-preview',
        contents=PROMPT
    )

    return response.text