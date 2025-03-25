import {create} from 'zustand';
import {persist,createJSONStorage} from 'zustand/middleware';
import {mmkvStorage} from './storage';
import { ToggleLeft } from 'lucide-react-native';

 export  const LiveStore = create()(

        (set,get)=>({
            sessionId:null,
            participants:[],
            chatMessages:[],
            micOn:false,
            videoOn:false,
            clear:()=>
                set({
                    sessionId:null,
                    participants:[]
                }),

            addSessionId:id=>{  //this function is used to add the session ID
                set({sessionId:id});  //this function is used to set the session ID
            },
            removeSessionId:id=>{
                set({sessionId:null});  //this function is used to remove the session ID
            },
            addParticipant:participant=>{  //this function is used to add the participant
                const {participants}=get();  //this function is used to get the participants
                if(!participants.find(p=>p.userId===participant?.userId)){  //this function is used to check if the participant is already in the participants array
                    set({participants:[...participants,participant]})  //this function is used to add the participant to the participants array

                }

            },
            removeParticipant:participantId=>{  //this function is used to remove the participant
                const {participants}=get();  //this function is used to get the participants
                set({participants:participants.filter(p=>p.userId!==participantId)})  //this function is used to remove the participant from the participants array
            },
            updateParticipant:updateParticipant=>{  //this function is used to update the participant
                const {participants}=get();  //this function is used to get the participants
                set({
                    participants:participants.map(p=> 
                        p.userId===updateParticipant.userId  //this function is used to check if the participant ID is the same as the participant ID
                        ?{
                            ...p,
                            micOn:updateParticipant.micOn,   //this function is used to update the mic on
                            videoOn:updateParticipant.videoOn,  //this function is used to update the video on

                        }
                        :p,
                    )
                })

            },
            setStreamURL:(participantId, streamURL)=>{   //this function is used to set the stream URL for the participant
                const {participants} = get ();  //this function is used to get the participants
                const updatedParticipants = participants.map (p => {  //this function is used to update the participants
                if (p.userId === participantId) {  //this function is used to check if the participant ID is the same as the participant ID
                return {...p, streamURL};  //this function is used to return the participant with the stream URL
                }
                return p;
            }
                );
                
                // if (participants.some (p => p.userId === participantId)) {
                // updatedParticipants.push({id: participantId, streamURL}) ;
                set({participants: updatedParticipants});
                
        },
        toggle:type=>{
            if(type==='mic'){  //this function is used to toggle the mic on
                set(state=>({micOn:!state.micOn}))  //this function is used to toggle the mic on
                // Empty if block without trailing spaces
            }else if(type==='video'){  //this function is used to toggle the video on
                set(state=>({videoOn:!state.videoOn}))  //this function is used to toggle the video on
            }
        },
        // clear: () => {  //this function is used to clear the store
        //     set({
        //         sessionId: null,  //this function is used to set the session ID to null
        //         participants: [],  //this function is used to set the participants to an empty array
        //         chatMessages: [],  //this function is used to set the chat messages to an empty array
        //         micOn: false,  //this function is used to set the mic on to false
        //         videoOn: false,  //this function is used to set the video on to false
        //     })
        // }
    }),
        {
            name:'live-storage',
            storage:createJSONStorage(()=>mmkvStorage),
        }

 );

