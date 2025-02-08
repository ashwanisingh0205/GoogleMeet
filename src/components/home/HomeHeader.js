import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUserstore } from '../../service/userStore'
import InquiryModal from './InquiryModal';
import { headerStyles } from '../../styles/headerStyles';
import { Menu,CircleUser } from 'lucide-react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { navigate } from '../../utils/NavigationUtils';

const HomeHeader = () => {
  const {user}=useUserstore();
    const[visible,setVisible]=useState(false)
    useEffect(()=>{
      const checkusername=()=>{
        const storename=user?.name;
        const storeprofile=user?.profile;
        if(!storename || !storeprofile){
          setVisible(true);
        }
      };
      checkusername();
    }, []);
    const handled=()=>{
      const storename=user?.name;
      const storeprofile=user?.profile;
      if(!storename || !storeprofile){
        setVisible(true);
        return
      }
      navigate('Joinmeetscreen')
    }
  return (
    <>
        <SafeAreaView />
        <View style={headerStyles.container}>
          <Menu size={RFValue(20)} color={Colors.text}/>
          <TouchableOpacity style={headerStyles.textContainer} onPress={handled}>
            <Text style={headerStyles.placeholderText}>Enter meeting code</Text>
          </TouchableOpacity>
          <CircleUser color={Colors.primary} onPress={()=>setVisible(true)} size={RFValue(20)}/>
        </View>
        <InquiryModal visible={visible} onclose={()=>setVisible(false)}/>
        
        
    </>
  )
}

export default HomeHeader

const styles = StyleSheet.create({})