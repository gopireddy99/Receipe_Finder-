from bs4 import BeautifulSoup

def format_recipe(recipe):
    """
    Format a recipe into a readable string.
    :param recipe: Recipe data from Spoonacular API (get_recipe_details response).
    :return: Formatted string.
    """
    instructions = recipe.get('instructions', 'No instructions available.')
    if instructions:
        soup = BeautifulSoup(instructions, 'html.parser')
        instructions = soup.get_text(separator='\n')  

    formatted_recipe = f"""
    Recipe: {recipe['title']}
    Ingredients:
    {', '.join([ingredient['name'] for ingredient in recipe['extendedIngredients']])}
    Instructions:
    {instructions}
    """
    return formatted_recipe