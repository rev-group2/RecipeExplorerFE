import React from 'react'
import { Recipe } from '../Types/recipeType'

type RecipeDetailsType = {recipeUuid: string | undefined, recipeDetails: Recipe | undefined}

function RecipeDetailsView({recipeUuid, recipeDetails}: RecipeDetailsType) {
  return (
    <div>
      <h1>Recipe</h1>
      <p>{recipeUuid}</p>
      <p>{recipeDetails?.recipeName}</p>
    </div>
  )
}

export default RecipeDetailsView