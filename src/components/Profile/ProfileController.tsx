import React, { useContext, useEffect, useState } from 'react';
import ProfileView from './ProfileView';
import { Params, useParams } from 'react-router-dom';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import path from 'path';
import { User, UserContext } from '../Context/UserContext';
import ActivityController from './ActivityController';
import { ProfileType } from '../Types/profileType';

const config = require("../../config");
const URL = `${config.path}`;

export default function ProfileController(props: any): JSX.Element {

    const setUser: Function | undefined = props.setUser;
    const user:User | undefined= useContext(UserContext);
    const { id }:Params<string> = useParams()
    const [profile, setProfile] = useState<ProfileType>();

    const isUserProfile = user && profile && user.uuid === profile.uuid;

    useEffect(() => {
        async function getUser(id: string | undefined){
            if(id){
                try{
                    const userInfo = await axios.get(`${URL}/users/profile/${id}`);
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
            const header: AxiosRequestConfig = { headers: { Authorization: `Bearer ${user?.token}` } };
            const response: AxiosResponse = await axios.post(`${URL}/users/profile`, editedUser, header);
            if(response.status >= 200 && response.status < 300){
                setProfile(editedUser);
                if(setUser){
                    setUser({...user, ...editedUser});
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
                <ProfileView profile={profile} token={user?.token} isUserProfile={isUserProfile} updateProfile={updateProfile} />
                <ActivityController profile={profile} isUserProfile={isUserProfile} />
            </>
        )
    }
    else{
        return <>No Profile Found</>
    }
    
}