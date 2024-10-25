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
            <div className="card m-1" style={{ width: "24rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{recipe?.recipeName}</h5>
                    <h6 className='card-text'>Reviewed By: {profile?.username}</h6>
                    <p className="card-text">{comment.description}</p>
                    {canDelete && <a href="#" className="btn btn-primary" onClick={deleteComment}>Delete</a>}
                </div>
            </div>
        </div>
    )
}
