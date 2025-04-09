import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Recipe } from '../types';
import Modal from '../Modal';
interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative h-48 overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            {recipe.title}
          </h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {recipe.usedIngredients.map((ingredient, index) => (
              <span
                key={index}
                className="px-2 py-1 text-sm bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-100 rounded-full"
              >
                {ingredient}
              </span>
            ))}
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            View Recipe
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          <div className="space-y-6">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                {recipe.title}
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    Used Ingredients
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {recipe.usedIngredients.map((ingredient, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-100 rounded-full"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
                {recipe.missedIngredients && recipe.missedIngredients.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                      Missing Ingredients
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {recipe.missedIngredients.map((ingredient, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Instructions
              </h3>
              <div className="prose dark:prose-invert max-w-none">
                <div 
                  className="text-gray-600 dark:text-gray-300 whitespace-pre-line"
                  dangerouslySetInnerHTML={{ __html: recipe.instructions }}
                />
              </div>
            </div>
            {recipe.extendedIngredients && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  All Ingredients
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {recipe.extendedIngredients.map((ingredient, index) => (
                    <li key={index} className="text-gray-600 dark:text-gray-300">
                      • {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RecipeCard;