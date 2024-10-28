import React, { useContext, useEffect } from 'react'
import { CommentType } from '../Types/commentType';
import { ProfileType } from '../Types/profileType';
import { RecipeType } from '../Types/recipeType';
import { User, UserContext } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function CommentView(props:any) {

    const user: User | undefined = useContext(UserContext);
    const profile:ProfileType = props.profile;
    const comment:CommentType = props.comment;
    const recipe:RecipeType = props.recipe;
    const canDelete: boolean = recipe?.authorUuid === user?.uuid || comment.authorUuid === user?.uuid;
    const navigate = useNavigate();

    function linkToRecipe() {

        if (recipe && recipe.uuid) {
            navigate(`/recipes/${comment.recipeUuid}`);
        }
    }
    
    return (
        <div>
            <div className="card m-1" style={{ width: "24rem" }}>
                <div className="card-header">
                    <h5 style={{ textAlign: "left" }}>{recipe?.recipeName}</h5>
                </div>
                <div className="card-body">
                    <h6 className='card-text' style={{ textAlign: "left" }} >Reviewed By: {profile?.username}</h6>
                    <p style={{ textAlign: "left" }}>Rating: {comment.rating}</p>
                    <p className="card-text" style={{ textAlign: "left" }}>{comment.description}</p>
                    {canDelete && <a href="#" className="btn btn-primary mx-2" onClick={props.deleteComment}>Delete Comment</a>}
                    <a href="#" className="btn btn-primary mx-2" onClick={linkToRecipe}>View Recipe</a>
                </div>
            </div>
        </div>
        )
}
