import 'react-native-get-random-values';
import { Alert, Keyboard, KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useUserstore } from '../../service/userStore';
import {v4 as uuidv4} from 'uuid';
import { inquiryStyles } from '../../styles/inquiryStyles';
import { screenHeight } from '../../utils/Constants';

const InquiryModal = ({visible,onclose}) => {
  const {user,setUser} = useUserstore();
  const [name,setName] = useState('');
  const [profile,setProfile] = useState('');
  useEffect(()=>{
    if(visible){
      const storename = user?.name;
      const storeprofilepic = user?.profile;
      setName(storename || '');
      setProfile(storeprofilepic || '');
    }
  },[visible]);
  const handlesave = ()=>{
    if(name && profile){
      setUser({
        id:uuidv4(),
        name,
        profile,
      });
      onclose();
    }
    else{
      Alert.alert('please fill the form sir');
    }
  };
  return (
    <Modal
    visible={visible}
    transparent={true}
    animationType ='fade'
    onRequestClose={onclose}
    >
<TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
  <View style={inquiryStyles.modalContainer}>
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    keyboardVerticalOffset={0}
    style={[
      inquiryStyles.keyboardAvoidingView,
      { flex: 1, justifyContent: 'flex-end' }
    ]}
    enabled
    >
      <ScrollView contentContainerStyle={[
        inquiryStyles.scrollViewContent,
        // { flexGrow: 1, justifyContent: 'flex-end' }
      ]}>
        <View style={inquiryStyles.modalContent}>
          <Text style={inquiryStyles.title}>Enter the Input</Text>
         <TextInput
         style={inquiryStyles.input}
         placeholder="enter your name"
         value={name}
         placeholderTextColor={'#ccc'}
         onChangeText={setName}/>
         <TextInput
         style={inquiryStyles.input}
         placeholder="enter your profile url"
         value={profile}
         placeholderTextColor={'#ccc'}
         onChangeText={setProfile}/>
         <View style={inquiryStyles.buttonContainer}>
          <TouchableOpacity style={inquiryStyles.button}
          onPress={handlesave}>
            <Text style={inquiryStyles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[inquiryStyles.button,inquiryStyles.cancelButton]}
          onPress={onclose}>
            <Text style={inquiryStyles.buttonText}>Close</Text>
          </TouchableOpacity>
         </View>

        </View>
      </ScrollView>

    </KeyboardAvoidingView>

  </View>

</TouchableWithoutFeedback>
    </Modal>
  );
};

export default InquiryModal;

const styles = StyleSheet.create({});
