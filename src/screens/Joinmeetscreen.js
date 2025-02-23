import { SafeAreaView, StyleSheet, Text, View ,TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native'
import React, { useState } from 'react'
import { joinStyles } from '../styles/joinStyles'
import { ChevronLeft, EllipsisVertical ,Video} from 'lucide-react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { goBack, navigate } from '../utils/NavigationUtils'
import { LinearGradient } from 'react-native-linear-gradient'
import { useWs } from '../service/api/WSprovider'
import { useUserstore } from '../service/userStore'
import { checkesession, createsession } from '../service/api/session'
import { LiveStore } from '../service/meetStore'
import { removeHyphens } from '../utils/Helpers'
const Joinmeetscreen = () => {
  const {emit}=useWs();
  const {user,addSession,removeSession}=useUserstore();
  const {addSessionId,removeSessionId}=LiveStore();
  const [code, setCode] = useState('')
  const createnewmeet=async()=>{
    const sessionId=await createsession();
    if(sessionId){
      addSession(sessionId)
      addSessionId(sessionId)
      emit('prepare-meet',{
        userId:user?.id,
        sessionId:sessionId
      })
      navigate('Preparemeetscreen')
    }
  }
  const joinviasessionid=async()=>{
    const isAvailable=await checkesession(code)
    if(isAvailable){
     emit('prepare-session',{
      userId:user?.id,
      sessionId:removeHyphens(code)
     })
   
    addSession(code)
    addSessionId(code)
    navigate('Preparemeetscreen') 
  }else{
    removeSession(code)
    removeSessionId(code)
    setCode('')
    Alert.alert('Session not found')

    }
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={joinStyles.container}>
      <SafeAreaView/>
      <View style={joinStyles.headerContainer}>
        <ChevronLeft size={RFValue(20)} color={Colors.text} onPress={()=>goBack()}/>
          <Text style={joinStyles.headerText}>Join Meet</Text>
          <EllipsisVertical size={RFValue(20)} color={Colors.text}/>
      </View>
      <LinearGradient
      colors={['#007AFF', '#A6C8FF']}
      style={joinStyles.gradientButton}
      start={{x:0, y:0}}
      end={{x:1, y:1}}
      >
        <TouchableOpacity style={joinStyles.button} activeOpacity={0.6} onPress={createnewmeet}>
         <Video size={RFValue(20)} color='#fff'/>
         <Text style={joinStyles.buttonText}>Create New Meet</Text>
        </TouchableOpacity>
      </LinearGradient>
        <Text style={joinStyles.orText}>Or</Text>
        <View style={joinStyles.inputContainer}>
          <Text style={joinStyles.labelText}>Enter the code provided by the Meeting Host</Text>
          <TextInput style={joinStyles.inputBox} 
          value={code}
          onChangeText={setCode}
         placeholder='Example: abc-mno-xyz-asd'
          placeholderTextColor='#888'
          returnKeyType='join'
          returnKeyLabel='Join'
          onSubmitEditing={joinviasessionid}
            />
          <Text style={joinStyles.noteText}>Note: This meeting is secured by cloud encryption but not end-to-end encryption <Text style={joinStyles.linkText}>Learn more</Text></Text>
        </View>
    </View>
    </TouchableWithoutFeedback>
  )
}

export default Joinmeetscreen

const styles = StyleSheet.create({})