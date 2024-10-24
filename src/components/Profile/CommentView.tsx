import React, { useEffect } from 'react'
import { CommentType } from '../Types/commentType';

export default function CommentView(props:any) {

    const isUserProfile:boolean = props.isUserProfile;
    const comment:CommentType = props.comment;

    function editComment(){
        console.log(`editing comment ${comment.uuid}`);
    }

    return (
        <div>
            <h3>{comment.authorUuid}</h3>
            {isUserProfile && <button className="btn btn-primary mx-3" onClick={editComment}>Edit Comment</button>}
            <h5>Rating {comment.rating}</h5>
            <p>{comment.description}</p>
        
        </div>
    )
}
