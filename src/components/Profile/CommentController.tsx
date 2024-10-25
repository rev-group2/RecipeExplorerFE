import React, { useContext, useEffect, useState } from 'react'
import { CommentType } from '../Types/commentType';
import { RecipeType } from '../Types/recipeType';
import { ProfileType } from '../Types/profileType';
import axios from 'axios';
import CommentView from './CommentView';
import { User, UserContext } from '../Context/UserContext';

const config = require("../../config");
const URL = `${config.path}`;

export default function CommentController(props: any) {
    
    const comment: CommentType = props.comment;
    const [recipe, setRecipe] = useState<RecipeType>(props.recipe);
    const [profile, setProfile] = useState<ProfileType>(props.profile);

    useEffect(() => {
        async function getRecipe(){
            try{
                const result = await axios.get(`${URL}/recipes/${comment.recipeUuid}`);
                if (result.status >= 200 && result.status < 300) {
                    setRecipe(result.data);
                    console.log(result.data);
                }
            }catch(error){
                console.log(error);
            }
        }
        if(!recipe){
            getRecipe()
        }
    }, [comment, recipe]);
    useEffect(() => {
        async function getUser() {
            try {
                const result = await axios.get(`${URL}/users/profile/${comment.authorUuid}`);
                if (result.status >= 200 && result.status < 300) {
                    setProfile(result.data);
                    console.log(result.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (!profile) {
            console.log(profile);
            getUser()
        }
    }, [comment, profile])

    return (
        <CommentView comment={comment} profile={profile} recipe={recipe} />
    )
}
