import React from 'react'
import { RecipeType } from '../Types/recipeType'

type RecipeDetailsType = {recipeUuid: string | undefined, recipeDetails: RecipeType | undefined}

function RecipeDetailsView({recipeUuid, recipeDetails}: RecipeDetailsType) {
  return (
    <div>
      <h1>{recipeDetails?.recipeName}</h1>
      <img src={recipeDetails?.recipeThumb} alt={recipeDetails?.recipeName} />
      <p>{recipeDetails?.recipeName}</p>
    </div>
  )
}

export default RecipeDetailsView