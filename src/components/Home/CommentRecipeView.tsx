import React from 'react'
import { ProfileType } from '../Types/profileType'
import { CommentType } from '../Types/commentType'
import { Link, useNavigate } from 'react-router-dom';

type CommentsProps = { comment: CommentType, profile: ProfileType | undefined}

export default function CommentRecipeView({ comment, profile }: CommentsProps ) {
    const navigate = useNavigate();

    function linkToUser() {
        navigate(`/profile/${comment.authorUuid}`);
        
    }

    return (
        <div className="comments-container" key={comment.uuid}>
            <Link className='recipe-comment-user' to={`/profile/${comment.authorUuid}`}>By: {profile?.username || "Recipe Explorer User"}</Link>
            <p className='recipe-comment-rating'>Rating: {comment.rating} / 10</p>
            <p className="recipe-comment">{comment.description}</p>
            <span className='recipe-comment-date'>{new Date(comment.creationDate * 1000).toLocaleDateString()}</span>
        </div>
  )
}
