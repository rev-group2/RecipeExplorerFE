import React, { useEffect, useState } from 'react'
import RecipeDetailsView from './RecipeDetailsView'
import { useParams } from 'react-router-dom'
import { RecipeType } from '../Types/recipeType';
import { Meal } from '../Types/mealType';
import config from '../../config';
const URL = `${config.path}`;

type SingleMeal = Meal['meals'][0];

function RecipeDetailsController() {
  const { uuid } = useParams<{uuid: string}>();
  const [recipe, setRecipe] = useState<RecipeType | undefined>(undefined);

  function transformMealData(recipe: SingleMeal): RecipeType {
    return {
      type: "recipe",
      uuid: recipe.idMeal,
      recipeName: recipe.strMeal,
      cuisine: recipe.strArea,
      category: recipe.strCategory,
      instructions: recipe.strInstructions,
      recipeThumb: recipe.strMealThumb,
      ingredients: [
        recipe.strIngredient1,
        recipe.strIngredient2,
        recipe.strIngredient3,
        recipe.strIngredient4,
        recipe.strIngredient5,
        recipe.strIngredient6,
        recipe.strIngredient7,
        recipe.strIngredient8,
        recipe.strIngredient9,
        recipe.strIngredient10,
        recipe.strIngredient11,
        recipe.strIngredient12,
        recipe.strIngredient13,
        recipe.strIngredient14,
        recipe.strIngredient15,
        recipe.strIngredient16,
        recipe.strIngredient17,
        recipe.strIngredient18,
        recipe.strIngredient19,
        recipe.strIngredient20,
      ].filter((ingredient): ingredient is string => ingredient !== null && ingredient !== "")
    };
  }

  useEffect(() => {
    async function getRecipe() {
      if (uuid) {
        if (uuid?.length < 8) {
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${uuid}`);
          const data = await response.json();
          const transformedRecipe = transformMealData(data.meals[0]);
          setRecipe(transformedRecipe);
        } else {
          const response = await fetch(`${URL}/recipes/${uuid}`);
          const data = await response.json();
          setRecipe(data);
        }
      }
    }

    getRecipe();
  }, [uuid])

  return (
    <RecipeDetailsView recipeUuid={uuid} recipeDetails={recipe}/>
  )
}

export default RecipeDetailsController