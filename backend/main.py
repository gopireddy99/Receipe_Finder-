from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from api.spoonacular import SpoonacularAPI
from utils.helpers import format_recipe

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

API_KEY = "5f4a8cb2cf7344508e105342c19c4153"
spoonacular = SpoonacularAPI(API_KEY)

@app.get("/api/recipes")
async def get_recipes(ingredients: str, number: int = 5):
    try:
        recipes = spoonacular.search_recipes_by_ingredients(ingredients, number)
        return {"recipes": recipes}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/recipe/{recipe_id}")
async def get_recipe_details(recipe_id: int):
    try:
        details = spoonacular.get_recipe_details(recipe_id)
        formatted = format_recipe(details)
        return {
            "id": details["id"],
            "title": details["title"],
            "image": details["image"],
            "instructions": formatted,
            "usedIngredients": [ing["name"] for ing in details.get("usedIngredients", [])],
            "missedIngredients": [ing["name"] for ing in details.get("missedIngredients", [])],
            "extendedIngredients": [ing["name"] for ing in details.get("extendedIngredients", [])]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))