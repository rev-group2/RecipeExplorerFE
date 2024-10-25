import React, { act, useEffect } from 'react';
import { RecipeType } from '../Types/recipeType';
import { CommentType } from '../Types/commentType';
import RecipeView from './RecipeView';
import CommentView from './CommentView';
import CommentController from './CommentController';
import { ProfileType } from '../Types/profileType';

export default function ActivityView(props: any) {

    const isUserProfile:boolean = props.isUserProfile;
    const activity: Array<CommentType | RecipeType> = props.activity;
    const profile: ProfileType = props.profile;
    //console.log(activity);

    return (
        <><h2>Activity</h2>
        <ul>
        {activity.length && activity.map((element: CommentType | RecipeType, index: number):JSX.Element => {
            if(element.type === "recipe"){
                return <div key={index}><RecipeView recipe={element} isUserProfile={isUserProfile}/></div>
            }
            else{
                return <div key={index}><CommentController comment={element} isUserProfile={isUserProfile} /></div>
            }
        })}
        </ul></>)
}
