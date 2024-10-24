import React, { useState } from 'react'
import { ProfileType } from '../Types/profileType';

export default function ProfileView(props:any): JSX.Element {

    
    const profile: ProfileType = props.profile;
    const isUserProfile = props.isUserProfile;
    const [editing, setEditing] = useState<boolean>(false);
    const [editedProfile, setEditedProfile] = useState<ProfileType>();

    function changeEditing(event: any){
        if(!editing){
            setEditedProfile(profile);
        }
        setEditing(!editing);
    }

    async function changeProfile(event: any){
        if(await props.updateProfile(editedProfile)){
            setEditing(!editing);
            console.log("after everything");
            console.log(profile);
        }
        else{
            console.log("error updating resource");
        }
    }

    if(profile && editing){
        return <div>
            <h1><input type="text" defaultValue={`${profile.username}`} placeholder='username' id="usernameChange" onChange={(e: any) => editedProfile && setEditedProfile({ ...editedProfile, username: e.target.value })}/></h1>
            <button className="btn btn-primary mx-3" onClick={changeEditing}>Finish Editing</button>
            <img id="picture" src={(profile.picture || "No Picture Located")} alt={"profile"}/>
            <h3><input type="text" defaultValue={`${profile.email}`} placeholder='email' id="emailChange" onChange={(e: any) => editedProfile && setEditedProfile({ ...editedProfile, email: e.target.value })}/></h3>
            <p><input type="text" defaultValue={`${profile.description || "Edit your description here"}`} placeholder='description' id="descriptionChange" onChange={(e: any) => editedProfile && setEditedProfile({ ...editedProfile, description: e.target.value })} /></p>
            <button className="btn btn-primary mx-3" onClick={changeProfile}>SAVE</button>
            </div >
    }
    else if(profile){
        return <div>
            <h1>{profile.username}</h1>
            {isUserProfile && <button className="btn btn-primary mx-3" onClick={changeEditing}>Edit Page</button>}
            <img id="picture" src={(profile.picture || "No Picture Located")} alt={"profile"}/>
            <h3>{profile.email}</h3>
            <p>{profile.description || "No Description added"}</p>
            </div>
    }
    return <>No Profile Found</>
}
