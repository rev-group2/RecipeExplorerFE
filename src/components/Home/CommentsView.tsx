import React from 'react'
import "../../styles/Home/CommentsView.css";
import { CommentType } from '../Types/commentType';
import CommentController from '../Profile/CommentController';
import CommentsController from './CommentsController';

type CommentsProps = {comments: CommentType[] | undefined, isVisible: boolean}

function CommentsView({comments, isVisible}: CommentsProps) {
  return (
    <div className={`comments-wrapper ${isVisible ? "" : "hidden"}`}>
    <p className='comments-review-count'>{comments?.length}&nbsp;{comments?.length && comments.length === 1 ? 'Review' : 'Reviews'}</p>
    {comments && comments.length ? (comments.map((comment) => (
      (<CommentsController comment={comment}/>)
      ))) : <p>No reviews yet</p>
    }
    </div>
  )
}

export default CommentsView