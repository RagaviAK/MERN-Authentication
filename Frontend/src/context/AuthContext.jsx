import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContent=createContext();

export const AppContextProvider=(props)=>{
    axios.defaults.withCredentials=true;
    const backend=import.meta.env.VITE_BACKEND_URL;
    const [isLoggedIn,setIsLoggedIn]=useState(false);
    const [userData,setUserData]=useState(false);
    const getUserData=async()=>{
        
        try {
             const {data}=await axios.get(backend+'api/user/data')
            data.success?setUserData(data.UserInfo):toast.error(data.message)
            setIsLoggedIn(true); 
        
        } catch (error) {
            toast.error(error.message)
            setIsLoggedIn(false); 
        }
       
    }
    useEffect(()=>{
        isLoggedIn &&  getUserData();
    },[])

    const value={
        backend,
        isLoggedIn,setIsLoggedIn,
        userData,setUserData,
        getUserData
    }
    return(
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    )
}