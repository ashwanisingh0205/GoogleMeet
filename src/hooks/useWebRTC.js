import React, {useState,useEffect,useRef} from 'react'
import {RTCPeerConnection,RTCSessionDescription,RTCIceCandidate,mediaDevices,MediaStream} from 'react-native-webrtc'
import { useWs } from '../service/api/WSprovider'
import {LiveStore} from '../service/meetStore'
import {useUserstore} from '../service/userStore' 
import { peerConstraints } from '../utils/Helpers'

const useWebRtc = () => {
    const {addSessionId,removeSessionId,addParticipant,removeParticipant,micOn,videoOn,participants,setStreamURL,sessionId,updateParticipant,toggle} = LiveStore()
    const {user} = useUserstore();
    const {emit,on,off} = useWs();
    const [localStream,setLocalStream] = useState(null)
    const peerConnections = useRef(new Map())
    const pendingCandidates= useRef(new Map())

 const startLocalStream=async()=>{
    try {
        const mediastream=mediaDevices.getUserMedia({
            video:true,
            audio:true
        })
        } catch (error) {
            console.log('error starting local stream',error )
        }
}

const establishPeerConnections=async()=>{
    participants?.forEach(async streamUser=> {
        if(!peerConnections.current.has(streamUser?.userId)){
            const peerConnection=new RTCPeerConnection(peerConstraints)
            peerConnections.current.set(streamUser?.userId,peerConnection)

            peerConnection.ontrack=event=>{
                const remoteStream=new MediaStream();
                event.streams[0].getTrack().forEach(track=>{
                    remoteStream.addTrack(track)
                })
                console.log('RECEIVING REMOTE STREAM',remoteStream.toURL());
                setStreamURL(streamUser?.userId,remoteStream)
            }
        }
        
    });

}
const joiningStream=async()=>{
    establishPeerConnections();

}



    
return {
    localStream,
    toggleMic,
    toggleVideo,
    switchCamera
}
    
}