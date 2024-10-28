import React, { useEffect, useState } from 'react'
import { ProfileType } from '../Types/profileType';
import axios from 'axios';
import { CommentType } from '../Types/commentType';
import CommentRecipeView from './CommentRecipeView';

const config = require("../../config");
const URL = `${config.path}`;

type CommentsProps = { comment: CommentType}

export default function CommentsController({ comment }: CommentsProps) {

    const [profile, setProfile] = useState<ProfileType | undefined>(undefined);

    useEffect(() => {
        async function getUser() {
            try {
                const result = await axios.get(`${URL}/users/profile/${comment.authorUuid}`);
                if (result.status >= 200 && result.status < 300) {
                    setProfile(result.data);
                    //console.log(result.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (!profile) {
            //console.log(profile);
            getUser()
        }
    }, [comment, profile]);

    return (
        <CommentRecipeView comment={comment} profile={profile}/>
    )
}
