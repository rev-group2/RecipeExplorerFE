import React, { act, useEffect, useState } from 'react';
import axios from 'axios';
import ActivityView from './ActivityView';
import { CommentType } from '../Types/commentType';
import { RecipeType } from '../Types/recipeType';
import { ProfileType } from '../Types/profileType';

const config = require("../../config");
const URL = `${config.path}`;

export default function ActivityController(props: any): JSX.Element {

    const isUserProfile:boolean = props.isUserProfile
    const profile:ProfileType = props.profile;
    let [activity, setActivity] = useState<Array<CommentType | RecipeType>>([]);


    useEffect(() => {
        async function getActivity(profile: ProfileType){
            try{
                if (profile && profile.uuid) {
                    const result = await axios.get(`${URL}/users/activity/${profile.uuid}`);
                    if (result.status >= 200 && result.status < 300){
                        console.log(result.data);
                        setActivity(result.data);
                    }
                    else{
                        throw new Error(`Bad API call in ActivityController, status code ${result.status}`);
                    }
                }
                else {
                    throw new Error(`profile or uuid is undefined`);
                }
            }catch(error){
                console.log(error);
            }
            
        }
        getActivity(profile)
    }, [profile])

    /*
    useEffect(() => {
        console.log("THIS IS THE ACTIVITY CONTROLLER")
    },[])*/

    return (
        <ActivityView activity={activity} isUserProfile={isUserProfile}/>
    )
}
