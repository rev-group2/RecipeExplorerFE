import React from 'react'
import { RecipeType } from '../Types/recipeType';

export default function RecipeView(props: any) {
    const recipe: RecipeType = props.recipe; 
    const isUserProfile: boolean = props.isUserProfile;

    function editRecipe(){
        console.log(`editing ${recipe.uuid}`)
    }
    
    return (
        <div>
            <h3>{recipe.recipeName}</h3>
            {isUserProfile && <button className="btn btn-primary mx-3" onClick={editRecipe}>Edit Recipe</button>}
            <img src={recipe.recipeThumb} alt={`${recipe.recipeName}`}></img>
            <p>{`${recipe.cuisine} | ${recipe.category}`}</p>
        </div>
    )
}
