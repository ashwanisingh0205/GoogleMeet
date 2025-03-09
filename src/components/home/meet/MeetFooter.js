import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { LiveStore } from '../../../service/meetStore'
import LinearGradient from 'react-native-linear-gradient';
import { footerStyles } from '../../../styles/footerStyles';
import { goBack } from '../../../utils/NavigationUtils';
import { Hand, Mic, MicOff, MoreVertical, PhoneOff, Video, VideoOff } from 'lucide-react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useUserstore } from '../../../service/userStore';

const MeetFooter = ({toggleMic,toggleVideo}) => {
   const {removeSession}=useUserstore();
    //  const {sessionId}=LiveStore();
  const {micOn,videoOn,sessionId,removeSessionId}=LiveStore();
  
  const cancel=()=>{
    removeSessionId(sessionId)
    removeSession(sessionId)
    goBack()
  }

  const getIconStyle=isActive=>({
    backgroundColor:isActive? ('rgba(255,255,255,0.1)'):('#ffffff'),
    padding:10,
    borderRadius:50,
  })
  const getIconColor= isActive =>(
    isActive ? 'white' : 'black'
  )
  return (
   <LinearGradient  colors={['black','rgba(0,0,0,0.7)','transparent'].reverse()}
   style={footerStyles.footerContainer} >
    <View style={footerStyles.iconContainer}>
      <TouchableOpacity
      style={footerStyles.callEndButton}
      onPress={cancel}>
        <PhoneOff color={'white'} size={RFValue(16)}/>
       </TouchableOpacity>
       <TouchableOpacity style={getIconStyle(videoOn)}
       onPress={()=>toggleVideo()}>
        {videoOn ? (
          <Video color={getIconColor(videoOn)} size={RFValue(14)}/>
        ) : (
          <VideoOff color={getIconColor(videoOn)} size={RFValue(14)}/>
        )}

       </TouchableOpacity>
       <TouchableOpacity style={getIconStyle(micOn)}
       onPress={()=>toggleMic()}>
        {micOn ? (
          <Mic color={getIconColor(micOn)} size={RFValue(14)}/>
        ) : (
          <MicOff color={getIconColor(micOn)} size={RFValue(14)}/>
        )}
       </TouchableOpacity>
       <TouchableOpacity style={footerStyles.iconButton}>
        <Hand color={'white'} size={RFValue(14)}/>
       </TouchableOpacity>
       <TouchableOpacity>
        <MoreVertical color={'white'} size={RFValue(14)}/>
       </TouchableOpacity>
    </View>
    </LinearGradient>
  )
}

export default MeetFooter

const styles = StyleSheet.create({})