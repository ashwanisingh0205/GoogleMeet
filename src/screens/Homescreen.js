import { Alert, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View,Image } from 'react-native'
import React from 'react'
import { homeStyles } from '../styles/homeStyles'
import HomeHeader from '../components/home/HomeHeader'
import {Calendar, Menu, Video} from 'lucide-react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { useUserstore } from '../service/userStore'
import { navigate } from '../utils/NavigationUtils'
import { useWs } from '../service/api/WSprovider'
import { LiveStore } from '../service/meetStore'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { addHyphens, removeHyphens } from '../utils/Helpers'
import { checkesession } from '../service/api/session'

const Homescreen = () => {
  const {emit}=useWs();
  const {user,sessions,addSession,removeSession}=useUserstore();
const {addSessionId,removeSessionId}=LiveStore();
  
  
  
  const handled=()=>{     //this function is used to join the meeting
    const storename=user?.name;
    const storeprofile=user?.profile;
    if(!storename || !storeprofile){
      Alert.alert('fill the data ')
      return
    }
    navigate('Joinmeetscreen')
  };
  const joinviasessionid=async(id)=>{  //this function is used to join the meeting via session id
    const storename=user?.name;
    if(!storename){
      // setVisible(true);
      Alert.alert('fill the data ')
      return
    }
    const avialable= await checkesession(id)  //this function is used to check if the session is available  
    if(avialable){
      emit('prepare',{  //this function is used to emit the prepare event
        userId:user?.id,  //sends the user ID to identify who is joining
        sessionsId:removeHyphens(id)  //sends the session ID without hyphens to match server format
      })
      addSession(id)  //this function is used to add the session
      addSessionId(id)  //this function is used to add the session id
      navigate('Preparemeetscreen')  //this function is used to navigate to the prepare meet screen


    }else{
      removeSession(id);  //this function is used to remove the session 
      removeSessionId(id)  //this function is used to remove the session id
      Alert.alert('There is no meeting')  //this function is used to alert the user that there is no meeting
    }
  }
  const rendersession=({item})=>{
   return(
    <View style={homeStyles.sessionContainer}>
      <Calendar size={RFValue(20)} color={Colors.icon}/>
      <View style={homeStyles.sessionTextContainer}>
        <Text style={homeStyles.sessionTitle}>{addHyphens(item)}</Text>
        <Text style={homeStyles.sessionTime}>just join and enjoy!</Text>
      </View>
      <TouchableOpacity style={homeStyles.joinButton} onPress={()=>joinviasessionid(item)}>
        <Text style={homeStyles.joinButtonText}>join</Text>
      </TouchableOpacity>


    </View>
   )
  }
  return (
    <View style={homeStyles.container}>
      <HomeHeader/>
      <FlatList
      data={sessions}
      renderItem={rendersession}
      key={item=>item}
      contentContainerStyle={{padding:20}}
      ListEmptyComponent={
        <>
        <Image source={require('../assets/images/bg.png')} style={homeStyles.img}/>
        
        <Text style={homeStyles.title}>Meeting calls for All</Text>
        <Text style={homeStyles.subTitle} >connect,collaborate and celebrate from anywhere with Google Meet</Text>
        </>
      }/>
      <TouchableOpacity style={homeStyles.absoluteButton} onPress={handled}>
        <Video size={RFValue(20)} color='#fff'/>
        <Text style={homeStyles.buttonText}>Join</Text>
       
      </TouchableOpacity>
    </View>
  )
}

export default Homescreen

const styles = StyleSheet.create({})