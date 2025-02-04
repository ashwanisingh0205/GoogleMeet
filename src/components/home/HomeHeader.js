import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const HomeHeader = () => {
    const[visible,setVisible]=useState(false)
  return (
    <View>
        <SafeAreaView/>
        {/* <View> */}
            <Text>yes maa</Text>
        {/* </View> */}
    </View>
  )
}

export default HomeHeader

const styles = StyleSheet.create({})