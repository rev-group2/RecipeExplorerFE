import React, { useContext, useEffect } from 'react'
import { CommentType } from '../Types/commentType';
import { ProfileType } from '../Types/profileType';
import { RecipeType } from '../Types/recipeType';
import { User, UserContext } from '../Context/UserContext';

export default function CommentView(props:any) {

    const user: User | undefined = useContext(UserContext);
    const profile:ProfileType = props.profile;
    const comment:CommentType = props.comment;
    const recipe:RecipeType = props.recipe;
    const canDelete: boolean = recipe?.authorUuid === user?.uuid || comment.authorUuid === user?.uuid;

    function deleteComment(){
        console.log(`delete comment ${comment.uuid}`);
    }

    return (
        <div>
            <h3>{recipe?.recipeName || comment.recipeUuid} </h3>
            <h6>{profile?.username || comment.authorUuid} </h6>
            {canDelete && <button className="btn btn-primary mx-3" onClick={deleteComment}>Delete</button>}
            <h5>Rating {comment.rating}</h5>
            <p>{comment.description}</p>
        
        </div>
    )
}
