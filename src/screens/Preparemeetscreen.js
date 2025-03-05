import { SafeAreaView, ScrollView, StyleSheet, Text, View ,Image, TouchableOpacity, Share} from 'react-native';
import React, { useEffect, useState } from 'react';
import { RTCView,mediaDevices } from 'react-native-webrtc';
import { useUserstore } from '../service/userStore';
import { useWs } from '../service/api/WSprovider';
import { LiveStore } from '../service/meetStore';
import { addHyphens, requestPermissions } from '../utils/Helpers';
import { goBack, navigate, replace } from '../utils/NavigationUtils';
import { prepareStyles } from '../styles/prepareStyles';
import { ChevronLeft,
   EllipsisVertical,
    Info,
    Mic,
     MicOff,
      MonitorUp,
      Share2,
      Shield,
      Video,
       VideoOff 
      } from 'lucide-react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from '../utils/Constants';
// import { Image } from 'react-native-svg';
// import {isCameraGranted,isMicrophoneGranted} from 'react-native-webrtc';

const Preparemeetscreen = () => {
  const {user} = useUserstore();
  const {emit,on,off} = useWs();
  const {sessionId,micOn,addParticipant,addSessionId,toggle,videoOn} = LiveStore();
  const [localStream,setLocalStream] = useState(null);
  const [participants,setParticipants] = useState([]);

  useEffect(()=>{
    const handleparticipantupdata = updateparticipant=>{
      setParticipants(updateparticipant?.participants);
    };
    on('session-info',handleparticipantupdata);
   return ()=>{
    if(localStream){
      localStream.getTracks().forEach(track=>track.stop());
      localStream?.release();
    }
    // setLocalStream(null);
    off('session-info',handleparticipantupdata);
   };
  },[sessionId,emit,on,off,localStream]);
  const showmMediaDevices = (audio,video)=>{
    //video:video?{facingMode:'environment'}:false}  -- for rear camera
    mediaDevices.getUserMedia({audio,video}).then(stream=>{
      setLocalStream(stream);
      const audioTrack = stream.getAudioTracks()[0];
      const videoTrack = stream.getVideoTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = audio;
      }
      if (videoTrack) {
        videoTrack.enabled = video;
      }
    }).catch(err => {
      console.log('error in getting media devices', err);
    });
  };
  const toggleMicState = newState=>{
    if(localStream){
      const audioTrack = localStream.getAudioTracks()[0];
      if(audioTrack){
        audioTrack.enabled = newState;
      }
    }
  };
  const toggleVideoState=newState=>{
    if(localStream){
      const videoTrack = localStream.getVideoTracks()[0];
      if(videoTrack){
        videoTrack.enabled = newState;
      }
    }
  }
  const toggleLocal = type=>{
    if(type === 'mic'){
      const newMicState = !micOn;
      toggleMicState(newMicState);
      toggle('mic');
     }
      else if(type === 'video'){
        const newVideoState = !videoOn;
        toggleVideoState(newVideoState);
        toggle('video');
    }
  };

  const fetchMediaPermissions = async()=>{
    const result = await requestPermissions();
    if(result.isCameraGranted){
      toggleLocal('video');}
      if(result.isMicrophoneGranted){
        toggleLocal('mic');
      }
      showmMediaDevices(result.isMicrophoneGranted,result.isCameraGranted);

  };
  useEffect(()=>{
    fetchMediaPermissions();
  }, []);
  const handleStartCall = async ()=>{
    try{
      emit('join-session',{
        name:user?.name,
        sessionId:sessionId,
        photo:user?.photo,
        userId:user?.id,
        micOn:micOn,
        videoOn:videoOn,
      });
      participants.forEach(i=>addParticipant(i));
      addSessionId(sessionId);
      replace('Livemeetscreen');

      }
      catch(error){
        console.log('error in starting call',error);
      }
    }

      const rendertext = ()=>{
        if(participants?.length === 0){
          return 'No one is in the call yet';
        }
        const names = participants
        ?.slice(0,2)
        ?.map(participant=>participant.name)
        ?.join(', ');

        const count = participants.length > 2 ? `and ${participants.length - 2} others` : '';
        return `${names}${count} in the call`;

      };
      console.log('------',localStream)
    

  return (
    <View style={prepareStyles.container}>
      <SafeAreaView/>
      <View style={prepareStyles.headerContainer}>
        <ChevronLeft
        size={RFValue(24)}
        color={Colors.text}
        onPress={()=>{
          goBack();
          addSessionId('');
        }}/>
        <EllipsisVertical
        size={RFValue(18)}
        color={Colors.text}/>
         </View>
        <ScrollView contentContainerStyle={{flex:1}}>
          <View style={prepareStyles.videoContainer}>
            <Text style={prepareStyles.meetingCode}>{addHyphens(sessionId)}</Text>
            <View style={prepareStyles.camera}>
            {/* <Image source={{uri:user?.profile}} style={prepareStyles?.image}/> */}
              { localStream && videoOn ? (
                <RTCView
                streamURL={localStream?.toURL()}
                style={prepareStyles?.localVideo}
                mirror
                objectFit={'cover'}
                />
              ) : (
                <Image source={{uri:user?.profile}} style={prepareStyles?.image}/>
              )}
              <View style={prepareStyles.toggleContainer}>
                <TouchableOpacity
                style={prepareStyles.iconButton}
                onPress={()=>toggleLocal('mic')}
                >
                  {micOn?(
                    <Mic
                    size={RFValue(12)}
                    color={'#fff'}
                    />
                  ):(
                    <MicOff size={RFValue(12)} color={'#fff'}/>
                    
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                style={prepareStyles.iconButton}
                onPress={()=>toggleLocal('video')}
                >
                  {videoOn?(
                    <Video
                    size={RFValue(12)}
                    color={'#fff'}
                    />
                  ):(
                    <VideoOff size={RFValue(12)} color={'#fff'}/>
                    )}
                </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={prepareStyles.buttonContainer}>
              <MonitorUp size={RFValue(14)} color={Colors.primary}/>
              <Text style={prepareStyles.buttonText}>Share Screen</Text>
            </TouchableOpacity>
            <Text style={prepareStyles.peopleText}>{rendertext()}</Text>
            <View/>
            </View> 


             <View style={prepareStyles.infoContainer}>
              <View style={prepareStyles.flexRowBetween}>
                <Info size={RFValue(14)} color={Colors.text}/>
              <Text style={prepareStyles.joiningText}>Joining Information</Text>
              <Share2 size={RFValue(14)} color={Colors.text}/>
              </View>
              <View style={{marginLeft:38}}>
                <Text style={prepareStyles.linkHeader}>Meeting link</Text>
                <Text style={prepareStyles.linkText}>meet.google.com{addHyphens(sessionId)}</Text>
              </View>
              <View style={prepareStyles.flexRow}>
                <Shield size={RFValue(14)} color={Colors.text}/>
                <Text style={prepareStyles.encryptionText}>Encryption</Text>
              </View>
             
            
         
          </View>
        </ScrollView>
        <View style={prepareStyles.joinContainer}>
          <TouchableOpacity style={prepareStyles.joinButton}
          onPress={handleStartCall}>
            <Text style={prepareStyles.joinButtonText}>Join</Text>
          </TouchableOpacity>
          <Text style={prepareStyles.noteText}> Joining as</Text>
          <Text style={prepareStyles.peopleText}>{user?.name}</Text>
        </View>

     
    </View>
  );
};

export default Preparemeetscreen;

const styles = StyleSheet.create({});
