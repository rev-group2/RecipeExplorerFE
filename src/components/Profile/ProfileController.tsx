import React, { useContext, useEffect, useState } from 'react';
import ProfileView from './ProfileView';
import { Params, useParams } from 'react-router-dom';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import path from 'path';
import { User, UserContext } from '../Context/UserContext';
import ActivityController from './ActivityController';
import { ProfileType } from '../Types/profileType';
import uploadImage from '../../helpers/uploadImage';


const config = require("../../config");
const PURL = `${config.path}`;

export default function ProfileController(props: any): JSX.Element {

    const setUser: Function | undefined = props.setUser;
    const user:User | undefined= useContext(UserContext);
    const { id }:Params<string> = useParams()
    const [profile, setProfile] = useState<ProfileType>();
    const [imageFile, setImageFile] = useState<File | undefined>(undefined);

    const isUserProfile = user && profile && user.uuid === profile.uuid;

    useEffect(() => {
        async function getUser(id: string | undefined){
            if(id){
                try{
                    const userInfo = await axios.get(`${PURL}/users/profile/${id}`);
                    if(userInfo.status >= 200 && userInfo.status < 300){
                        setProfile(userInfo.data);
                    }
                    else{
                        setProfile(undefined);
                    }
                } catch (err){
                    console.log(err);
                }
            }
        }
        getUser(id)
    }, [id])


    async function updateProfile(editedUser:ProfileType):Promise<boolean>{
        try{    
            let submittedProfile = editedUser;
            if (user && imageFile) {
                const realImageUrl = await uploadImage(imageFile, user.token);
                if(realImageUrl){
                    submittedProfile.picture = realImageUrl;
                }
            }
            const header: AxiosRequestConfig = { headers: { Authorization: `Bearer ${user?.token}` } };
            const response: AxiosResponse = await axios.post(`${PURL}/users/profile`, submittedProfile, header);
            if(response.status >= 200 && response.status < 300){
                setProfile(submittedProfile);
                if(setUser){
                    setUser({ ...user, ...submittedProfile });
                }
                return true;
            }
            return false;
        }catch(error){
            console.log(error)
            return false;
        }
    }

    if(profile){
        return (
            <>
                <ProfileView profile={profile} token={user?.token} isUserProfile={isUserProfile} updateProfile={updateProfile} setImageFile={setImageFile}/>
                <ActivityController profile={profile} isUserProfile={isUserProfile} />
            </>
        )
    }
    else{
        return <h3>No Profile Found</h3>
    }
    
}