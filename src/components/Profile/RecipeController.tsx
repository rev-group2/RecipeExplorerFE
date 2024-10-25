import React, { useState } from 'react'
import RecipeView from './RecipeView'
import { CommentType } from '../Types/commentType';
import { ProfileType } from '../Types/profileType';
import { RecipeType } from '../Types/recipeType';

export default function RecipeController(props: any) {

    const recipe: RecipeType = props.recipe;
    
    return (
        <RecipeView recipe={recipe}/>
    )
}
