import React from 'react'
import "../../styles/Home/CommentsView.css";
import { CommentType } from '../Types/commentType';

type CommentsProps = {comments: CommentType[] | undefined, isVisible: boolean}

function CommentsView({comments, isVisible}: CommentsProps) {
  return (
    <div className={`comments-wrapper ${isVisible ? "" : "hidden"}`}>
    <p className='comments-review-count'>{comments?.length}&nbsp;{comments?.length && comments.length === 1 ? 'Review' : 'Reviews'}</p>
    {comments && comments.length ? (comments.map((comment) => (
      (
      <div className="comments-container" key={comment.uuid}>
        <p className='recipe-comment-user'>Recipe Explorer Member</p>
        <p className='recipe-comment-rating'>Rating: {comment.rating} / 10</p>
        <p className="recipe-comment">{comment.description}</p>
        <span className='recipe-comment-date'>{new Date(comment.creationDate * 1000).toLocaleDateString()}</span>
      </div>)
      ))) : <p>No reviews yet</p>
    }
    </div>
  )
}

export default CommentsView