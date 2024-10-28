import React from 'react'
import { RecipeType } from '../Types/recipeType';
import { useNavigate } from 'react-router-dom';

export default function RecipeView(props: any) {
    const recipe: RecipeType = props.recipe; 
    const navigate = useNavigate();
    
    function linkToRecipe(){
        
        if(recipe && recipe.uuid){
            navigate(`/recipes/${recipe.uuid}`);
        }
    }

    return (
        <div>
            <div className="card m-1" style={{ width: "24rem" }} onClick={() => { linkToRecipe() }}>
                <img src={recipe?.recipeThumb} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{recipe?.recipeName}</h5>
                </div>
            </div>
        </div>
    )
}
