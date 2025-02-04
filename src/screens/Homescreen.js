import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { homeStyles } from '../styles/homeStyles'
import HomeHeader from '../components/home/HomeHeader'

const Homescreen = () => {
  return (
    <View style={homeStyles.container}>
      <HomeHeader/>
    </View>
  )
}

export default Homescreen

const styles = StyleSheet.create({})