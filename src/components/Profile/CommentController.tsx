import React, { useContext, useEffect, useState } from 'react'
import { CommentType } from '../Types/commentType';
import { RecipeType } from '../Types/recipeType';
import { ProfileType } from '../Types/profileType';
import axios, { AxiosRequestConfig } from 'axios';
import CommentView from './CommentView';
import { User, UserContext } from '../Context/UserContext';
import transformSingleMealData from '../../helpers/transformMealData';

const config = require("../../config");
const URL = `${config.path}`;

export default function CommentController(props: any) {
    
    const user: User | undefined = useContext(UserContext);
    const comment: CommentType = props.comment;
    const [recipe, setRecipe] = useState<RecipeType>(props.recipe);
    const [profile, setProfile] = useState<ProfileType>(props.profile);
    const [display, setDisplay] = useState<boolean>(true);

    useEffect(() => {
        async function getRecipe(){
            try{
                const result = await axios.get(`${URL}/recipes/${comment.recipeUuid}`);
                if (result.status >= 200 && result.status < 300) {
                    setRecipe(result.data);
                }
            }catch(error){
                console.log(error);
            }
        }
        
        async function getMealDBRecipe(){
            try{
                const resultMealDB = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${comment.recipeUuid}`);
                if (resultMealDB.status >= 200 && resultMealDB.status < 300) {
                    if(resultMealDB.data.meals !== "Invalid ID"){
                        const formattedRecipe = transformSingleMealData(resultMealDB.data)
                        setRecipe(formattedRecipe);
                    }
                }
            }catch(error){
                console.log(error);
            }
        }
        if(!recipe){
            getRecipe()
            getMealDBRecipe();
        }
    }, [comment, recipe]);
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
    }, [comment, profile])

    async function deleteComment(){
        try{
            const header: AxiosRequestConfig = { headers: { Authorization: `Bearer ${user?.token}` } };
            const response = await axios.delete(`${URL}/comments/${comment.uuid}`, header);
            if(response.status >= 200 && response.status < 300){
                setDisplay(false);
            }
            else{
                throw new Error(`error deleting comment ${comment.uuid}`);
            }
        }catch(error){
            console.log(error);
        }
    }
    if(display){
        return (
            <CommentView comment={comment} profile={profile} recipe={recipe} deleteComment={deleteComment} />
        )
    }
    else{
        return <></>
    }
    
}
