import { Button, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect,useState } from 'react'
import { screenHeight, screenWidth } from '../utils/Constants'
import { navigate, resetAndNavigate } from '../utils/NavigationUtils'

const Splashscreen = () => {

  useEffect(()=>{
  const timer=setTimeout(() => {
    navigate('Homescreen')
    return()=>clearTimeout(timer)
  },1000);
  },[])
  return (
    <SafeAreaView style={styles.container}>
     <Image source={require('../assets/images/g.png')} style={styles.img}/>
    </SafeAreaView>
  )
}

export default Splashscreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  img:{
    width:screenWidth*1.2,
    height:screenHeight*0.7,
    // resizeMode:'contain'
    resizeMode:'center'
  }
})