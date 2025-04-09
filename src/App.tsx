import React, { useState } from 'react';
import { Moon, Sun, ChefHat, Search, Loader2 } from 'lucide-react';
import RecipeCard from './components/RecipeCard';
import { Recipe } from './types';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [ingredients, setIngredients] = useState('');
  const [recipeCount, setRecipeCount] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingredients.trim()) return;
    
    setIsLoading(true);
    try {
      // First fetch recipe IDs
      const searchResponse = await fetch(
        `http://localhost:8000/api/recipes?ingredients=${encodeURIComponent(ingredients)}&number=${recipeCount}`
      );
      const searchData = await searchResponse.json();
      
      // Then fetch details for each recipe
      const recipesWithDetails = await Promise.all(
        searchData.recipes.map(async (recipe: any) => {
          const detailsResponse = await fetch(
            `http://localhost:8000/api/recipe/${recipe.id}`
          );
          return await detailsResponse.json();
        })
      );
      
      setRecipes(recipesWithDetails);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      alert('Failed to fetch recipes. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'
    }`}>
      <nav className="fixed w-full top-0 z-10 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ChefHat className="w-8 h-8 text-orange-500" />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Recipe Generator</h1>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {isDarkMode ? (
              <Sun className="w-6 h-6 text-yellow-500" />
            ) : (
              <Moon className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>
      </nav>

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <textarea
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="Enter your ingredients (separated by commas)"
                className="w-full h-32 p-4 rounded-lg border-2 border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 transition-all dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:focus:border-orange-500"
                required
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="flex-1 space-y-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Number of Recipes
                </span>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={recipeCount}
                  onChange={(e) => setRecipeCount(parseInt(e.target.value))}
                  className="w-full p-2 rounded-md border-2 border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 transition-all dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
              </label>

              <button
                type="submit"
                disabled={isLoading || !ingredients.trim()}
                className="px-6 py-2 bg-orange-500 text-white rounded-lg font-medium flex items-center gap-2 hover:bg-orange-600 focus:ring focus:ring-orange-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
                Generate Recipes
              </button>
            </div>
          </form>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>

          {isLoading && recipes.length === 0 && (
            <div className="mt-12 text-center">
              <Loader2 className="w-12 h-12 mx-auto animate-spin text-orange-500" />
              <p className="mt-4 text-gray-600 dark:text-gray-300">Finding delicious recipes...</p>
            </div>
          )}

          {!isLoading && recipes.length === 0 && (
            <div className="mt-12 text-center">
              <ChefHat className="w-12 h-12 mx-auto text-gray-400" />
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                No recipes yet. Enter some ingredients to get started!
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;