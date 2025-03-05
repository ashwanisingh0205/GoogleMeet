import { Alert, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { LiveStore } from '../../../service/meetStore';
import { addHyphens } from '../../../utils/Helpers';
import {  SwitchCamera, Volume2 } from 'lucide-react-native';

const MeetHeader = ({switchCamera}) => {
    

    const {sessionId}=LiveStore();
  return (
   <LinearGradient style={{width:'100%'}} colors={['black','rgba(0,0,0,0.7)','transparent']} >
    <SafeAreaView/>
    <View style={styles.header}>
        <Text style={{color:'white',fontSize:18,fontWeight:500}}>{addHyphens(sessionId)}</Text>
        <View style={styles.main}>
            <SwitchCamera onPress={switchCamera}  size={20} color={'white'}/>
       
        <Volume2 size={20} color={'#fff'} style={{marginLeft:20}} />
        </View>
        
    </View>
       

   </LinearGradient>
  );
};

export default MeetHeader

const styles = StyleSheet.create({
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:16,
        paddingVertical:30,
        paddingTop:Platform==='android'?10:0,

    },
    main:{
        flexDirection:'row',
        alignItems:'center'
    }
})