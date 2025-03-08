import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useWebRtc } from '../hooks/useWebRTC'
import { useContainerDimension } from '../hooks/useContainerDimension';
import MeetHeader from '../components/home/meet/MeetHeader';
import UserView from '../components/home/meet/UserView';
import People from '../components/home/meet/People';
import NoUserInvite from '../components/home/meet/NoUserInvite';
import MeetFooter from '../components/home/meet/MeetFooter';
// import { peopleData } from '../utils/dummyData';

const Livemeetscreen = () => {
  const {participants,localStream,toggleMic,toggleVideo,switchCamera}=useWebRtc();
  const {containerDimension,onContainerLayout}=useContainerDimension();
  return (
    <View style={styles.container}>
      <MeetHeader   containerDimension={containerDimension} switchCamera={switchCamera}/>
      <View style={styles.containers} onLayout={onContainerLayout}>
        {localStream && containerDimension && (
          <UserView
          localStream={localStream}
          containerDimension={containerDimension}/>
        )
      }
      {participants?.length>0 ? (
        <People
        people={participants}
        containerDimension={containerDimension}
        />
      ):(
        <NoUserInvite/> 
      )}

      </View>
     
      <MeetFooter toggleMic={toggleMic} toggleVideo={toggleVideo}/>

      {/* <Text>Livemeetscreen</Text> */}
    </View>
  )
}

export default Livemeetscreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    
  },
  containers:{
    flex:1,
    marginBottom:16
  }
  
})
