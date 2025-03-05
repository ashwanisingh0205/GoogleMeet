import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { LiveStore } from '../../../service/meetStore'
import { inviteStyles } from '../../../styles/inviteStyles';
import { addHyphens } from '../../../utils/Helpers';
import { Clapperboard, Clipboard, Share } from 'lucide-react-native';

const NoUserInvite = () => {
    const {sessionId}=LiveStore();
    console.log('sessionId',sessionId);
  return (
    <View style={inviteStyles.container}>
      <Text style={inviteStyles.headerText}>You're the only one here</Text>
      <Text style={inviteStyles.subText}>Share the link to others that you want to connect in the meeting</Text>

      <View style={inviteStyles.linkContainer}>
          <Text style={inviteStyles.linkText}>meet.google.com/{addHyphens(sessionId)}</Text>
          <Clipboard size={20} color={'#fff'} style={{marginLeft:10}}/>
        </View>
        <TouchableOpacity style={inviteStyles.shareButton}> 
            <Share size={20} color={'black'}/>
            <Text style={inviteStyles.shareText}>Share Invite</Text>

            </TouchableOpacity>
            
    </View>
  )
}

export default NoUserInvite

const styles = StyleSheet.create({})