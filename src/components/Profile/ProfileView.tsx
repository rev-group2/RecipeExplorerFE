import React, { useState } from 'react'
import { ProfileType } from '../Types/profileType';
import "../../styles/Profile/ProfileView.css";
import noProfilePhoto from "../../noProfilePhoto.jpg";

export default function ProfileView(props:any): JSX.Element {

    
    const profile: ProfileType = props.profile;
    const isUserProfile = props.isUserProfile;
    const [editing, setEditing] = useState<boolean>(false);
    const [editedProfile, setEditedProfile] = useState<ProfileType>(profile);
    

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

    function handleImageSelection(e: React.ChangeEvent<HTMLInputElement>) {
        try {
            const file = e.target.files?.[0];
            if (file) {
                const imageUrl = URL.createObjectURL(file);
                setEditedProfile({ ...editedProfile, picture:imageUrl});
                props.setImageFile(file);
            }
        } catch (err) {
            console.error(err);
        }
    }
    if(profile && editing){
        return <div id='profileDocument'>
            <table id='profileLayoutTable1'>
                <tr>
                    <td><img id="profilePhotoEdit" src={(editedProfile.picture || noProfilePhoto)} alt={"profile"} /></td>
                    <td><input type="file" id='Upload Image' onChange={handleImageSelection}>Upload</input></td>
                    <td><h1><input type="text" defaultValue={`${profile.username}`} placeholder='username' id="usernameChange" onChange={(e: any) => editedProfile && setEditedProfile({ ...editedProfile, username: e.target.value })} /></h1></td>
                    <td id='profileTableSpacer2'></td>
                    <td><button id='profileEditButton' onClick={changeEditing}>Finish</button></td>
                </tr>
            </table> 
            <table>
                <tr>
                    <td><input id='profileEmail' type="text" defaultValue={`${profile.email}`} placeholder='email' onChange={(e: any) => editedProfile && setEditedProfile({ ...editedProfile, email: e.target.value })}/></td>
                    <td id='profileTableSpacer1'></td>
                    <td><button onClick={changeProfile}>SAVE</button></td>
                </tr>
            </table>
            <input id='profileDescription' type="text" defaultValue={`${profile.description || ""}`} placeholder='description' onChange={(e: any) => editedProfile && setEditedProfile({ ...editedProfile, description: e.target.value })} />
            </div >
    }
    else{
        return <div id='profileDocument'>
            <table id='profileLayoutTable1'>
                <tr>
                    <td><img id="profilePhoto" src={(profile.picture || noProfilePhoto)} alt={"profile"} /></td>
                    <td><h1 id='profileName'>{profile.username}</h1></td>
                    <td id='profileTableSpacer1'></td>
                    <td>{isUserProfile ? <button id='profileEditButton' onClick={changeEditing}>Edit</button> : <></> }</td>
                </tr>
            </table> 
            <table>
                <tr>
                    <td><p id='profileEmail'>{profile.email}</p></td>
                    <td id='profileTableSpacer1'></td>
                </tr>
            </table>
            <p id='profileDescription'>{profile.description || "No Description added\n\n"}</p>
            </div>
    }
}
