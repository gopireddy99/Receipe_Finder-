import requests

class SpoonacularAPI:
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = "https://api.spoonacular.com/recipes"

    def search_recipes_by_ingredients(self, ingredients, number=5):
        """
        Search for recipes by ingredients.
        :param ingredients: Comma-separated list of ingredients.
        :param number: Number of recipes to return.
        :return: List of recipes.
        """
        url = f"{self.base_url}/findByIngredients"
        params = {
            "apiKey": self.api_key,
            "ingredients": ingredients,
            "number": number,
        }
        response = requests.get(url, params=params)
        if response.status_code == 200:
            return response.json()
        else:
            raise Exception(f"API Error: {response.status_code} - {response.text}")

    def get_recipe_details(self, recipe_id):
        """
        Get detailed information about a recipe.
        :param recipe_id: ID of the recipe.
        :return: Recipe details.
        """
        url = f"{self.base_url}/{recipe_id}/information"
        params = {
            "apiKey": self.api_key,
            "includeNutrition": False,
        }
        response = requests.get(url, params=params)
        if response.status_code == 200:
            return response.json()
        else:
            raise Exception(f"API Error: {response.status_code} - {response.text}")