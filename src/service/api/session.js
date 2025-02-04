import { Alert } from "react-native"
import axios from 'axios'
import { BASE_URL } from "../config"


export const createsession=async()=>{
    try {
        const apiRes=await axios.post(`${BASE_URL}/create-session`)
        return apiRes?.data?.sessionId?;
        
    } catch (error) {
        console.log('error threw',error)
        Alert.alert('there was an error')
        return null
    }
};

export const checkesession=async(id)=>{
    try {
        const apiRes=await axios.get(`${BASE_URL}/is-alive?sessionId=${id}`)
        return apiRes?.data?.isAlive?;
        
    } catch (error) {
        console.log('Session get error',error)
        return false;
    }
}