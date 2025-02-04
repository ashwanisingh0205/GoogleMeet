import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { navigationRef } from '../utils/NavigationUtils'
import Splashscreen from '../screens/Splashscreen'
import Homescreen from '../screens/Homescreen'
import Joinmeetscreen from '../screens/Joinmeetscreen'
import Preparemeetscreen from '../screens/Preparemeetscreen'
import Livemeetscreen from '../screens/Livemeetscreen'
import { WSprovider } from '../service/api/WSprovider'

const Navigation = () => {
    const Stack=createNativeStackNavigator()
  return (
    <WSprovider>
  <NavigationContainer ref={navigationRef}>
    <Stack.Navigator initialRouteName='Splashscreen' screenOptions={{headerShown:false}}>
        <Stack.Screen name='Splashscreen' component={Splashscreen}/>
        <Stack.Screen name='Homescreen' component={Homescreen}/>
        <Stack.Screen name='Joinmeetscreen' component={Joinmeetscreen}/>
        <Stack.Screen name='Preparemeetscreen' component={Preparemeetscreen}/>
        <Stack.Screen name='Livemeetscreen' component={Livemeetscreen}/>
    </Stack.Navigator>

  </NavigationContainer>
   </WSprovider>
  );
};

export default Navigation

const styles = StyleSheet.create({})