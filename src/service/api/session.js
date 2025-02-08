import { Alert } from "react-native"
import axios from 'axios'
import { BASE_URL } from "../config"


export const createsession=async()=>{  //this function is used to create a session
    try {
        const apiRes=await axios.post(`${BASE_URL}/create-session`)  //this function is used to create a session
        return apiRes?.data?.sessionId;  //this function is used to return the session id
        
    } catch (error) {
        console.log('error threw',error)
        Alert.alert('there was an error')
        return null
    }
};

export const checkesession=async(id)=>{  //this function is used to check if the session is available
    try {
        const apiRes=await axios.get(`${BASE_URL}/is-alive?sessionId=${id}`)  //this function is used to check if the session is available
        return apiRes?.data?.isAlive;  //this function is used to return the session is available
        
    } catch (error) {
        console.log('Session get error',error)
        return false;
    }
}