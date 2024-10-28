import React from 'react'
import { RecipeType } from '../components/Types/recipeType'
import { Meal } from '../components/Types/mealType';


export default function transformSingleMealData(meal: Meal): RecipeType {
    const singleMeal = meal.meals[0];
    return {
        type: "recipe",
        uuid: singleMeal.idMeal,
        recipeName: singleMeal.strMeal,
        cuisine: singleMeal.strArea,
        category: singleMeal.strCategory,
        instructions: singleMeal.strInstructions,
        recipeThumb: singleMeal.strMealThumb,
        ingredients: [
            singleMeal.strIngredient1,
            singleMeal.strIngredient2,
            singleMeal.strIngredient3,
            singleMeal.strIngredient4,
            singleMeal.strIngredient5,
            singleMeal.strIngredient6,
            singleMeal.strIngredient7,
            singleMeal.strIngredient8,
            singleMeal.strIngredient9,
            singleMeal.strIngredient10,
            singleMeal.strIngredient11,
            singleMeal.strIngredient12,
            singleMeal.strIngredient13,
            singleMeal.strIngredient14,
            singleMeal.strIngredient15,
            singleMeal.strIngredient16,
            singleMeal.strIngredient17,
            singleMeal.strIngredient18,
            singleMeal.strIngredient19,
            singleMeal.strIngredient20,
        ].filter((ingredient): ingredient is string => ingredient !== null && ingredient !== "")
        };
}