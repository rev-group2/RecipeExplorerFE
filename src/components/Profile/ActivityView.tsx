import React, { act, useEffect } from 'react';
import { RecipeType } from '../Types/recipeType';
import { CommentType } from '../Types/commentType';
import RecipeView from './RecipeView';
import CommentView from './CommentView';

export default function ActivityView(props: any) {

    const isUserProfile:boolean = props.isUserProfile;
    const activity: Array<CommentType | RecipeType> = props.activity;
    

    return (<ul>
        {activity.map((element: CommentType | RecipeType, index: number):JSX.Element => {
            if(element.type === "recipe"){
                return <div key={index}><RecipeView recipe={element} isUserProfile={isUserProfile}/></div>
            }
            else{
                return <div key={index}><CommentView comment={element} isUserProfile={isUserProfile} /></div>
            }
        })}
    </ul>)
}
