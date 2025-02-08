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

            addSessionId:id=>{
                set({sessionId:id});
            },
            removeSessionId:id=>{
                set({sessionId:null});
            },
            addParticipant:participant=>{
                const {participants}=get();
                if(!participants.find(p=>p.userId===participant?.userId)){
                    set({participants:[...participants,participant]})

                }

            },
            removeParticipant:participantId=>{
                const {participants}=get();
                set({participants:participants.filter(p=>p.userId!==participantId)})
            },
            updateParticipant:updateParticipant=>{
                const {participants}=get();
                set({
                    participants:participants.map(p=>
                        p.userId===updateParticipant.userId
                        ?{
                            ...p,
                            micOn:updateParticipant.micOn,
                            videoOn:updateParticipant.videoOn,

                        }
                        :p,
                    )
                })

            },
            setStreamURL:(participantId, streamURL)=>{
                const {participants} = get ();
                const updatedParticipants = participants.map (p => {
                if (p.userId === participantId) {
                return {...p, streamURL};
                }
                return p;
            }
                );
                
                // if (participants.some (p => p.userId === participantId)) {
                // updatedParticipants.push({id: participantId, streamURL}) ;
                set({participants: updatedParticipants});
                
        },
        toggle:type=>{
            if(type==='mic'){
                set(state=>({micOn:!state.micOn}))
                // Empty if block without trailing spaces
            }else if(type==='video'){
                set(state=>({videoOn:!state.videoOn}))
            }
        },
        clear: () => {
            set({
                sessionId: null,
                participants: [],
                chatMessages: [],
                micOn: false,
                videoOn: false,
            })
        }
    }),
        {
            name:'live-storage',
            storage:createJSONStorage(()=>mmkvStorage),
        }

 );

