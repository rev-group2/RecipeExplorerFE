import React, { act, useEffect } from 'react';
import { RecipeType } from '../Types/recipeType';
import { CommentType } from '../Types/commentType';
import RecipeView from './RecipeView';
import CommentView from './CommentView';
import CommentController from './CommentController';
import { ProfileType } from '../Types/profileType';
import RecipeController from './RecipeController';

export default function ActivityView(props: any) {

    const isUserProfile:boolean = props.isUserProfile;
    const activity: Array<CommentType | RecipeType> = props.activity;
    const profile: ProfileType = props.profile;
    //console.log(activity);


    if (activity.length > 0){
        return (
        <><h2>Activity</h2>
        <ul>
        { activity.map((element: CommentType | RecipeType, index: number):JSX.Element => {
            if(element.type === "recipe"){
                return <div key={index}><RecipeController recipe={element} isUserProfile={isUserProfile} profile={profile}/></div>
            }
            else{
                return <div key={index}><CommentController comment={element} isUserProfile={isUserProfile} profile={profile}/></div>
            }
        })}
        </ul></>)
    }
    else{
        return <><h2>Activity</h2><p>This user hasn't done anything yet...</p></>
    }
}
