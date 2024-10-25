import React from 'react'
import { RecipeType } from '../Types/recipeType'
import "../../styles/RecipeDetails/RecipeDetails.css"
import { Link } from 'react-router-dom'

type RecipeDetailsType = {recipeAuthor: string | undefined, recipeDetails: RecipeType | undefined, rating: string}

function RecipeDetailsView({recipeAuthor, recipeDetails, rating}: RecipeDetailsType) {
  return (
    <div className='recipe-details-container'>
      <div className='recipe-details-wrapper'>
        <h1>{recipeDetails?.recipeName}</h1>
        <p id="recipe-info"><span id="rating">{rating}</span><span id='cuisine'>Cuisine:&nbsp;{recipeDetails?.cuisine}</span><span id='category'>Category:&nbsp;{recipeDetails?.category}</span></p>
        <img id="recipe-details-image" src={recipeDetails?.recipeThumb} alt={recipeDetails?.recipeName} />
        { recipeDetails?.authorUuid === recipeAuthor ? <Link id="edit-recipe-button" to={`/recipes/edit/${recipeDetails?.uuid}`}>Edit</Link> : null}
        <div className='recipe-text-wrapper'>
          {recipeDetails?.description ? 
          <div id='recipe-description-wrapper'>
            <h3>Description</h3>
            <p>{recipeDetails?.description}</p> 
          </div>: null}
          <div id="recipe-ingredients-wrapper">
            <h3>Ingredients</h3>
              {recipeDetails?.ingredients.map ? (<ul> {recipeDetails?.ingredients.map((ingredient, index) => {
                return (
                  <li key={index}>{ingredient}</li>
                )
              })}</ul>) : <p>{recipeDetails?.ingredients}</p>}
          </div>
          <div id="recipe-instructions-wrapper">
            <h3>Instructions</h3>
            <p>{recipeDetails?.instructions}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeDetailsView