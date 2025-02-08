import {create} from 'zustand'  //this function is used to create the user store
import {persist,createJSONStorage} from 'zustand/middleware'  //this function is used to persist the user store
import {mmkvStorage} from './storage'  //this function is used to create the storage

 export  const useUserstore = create()(  //this function is used to create the user store
    persist(  //this function is used to persist the user store
        (set,get)=>({  //this function is used to set the user store
            user:null,  //this function is used to set the user
            sessions:[],  //this function is used to set the sessions
            setUser:data=>set({user:data}),  //this function is used to set the user
            addSession:sessionId=>{  //this function is used to add the session
                const {sessions}=get();      //this function is used to get the sessions
                const exist=sessions.findIndex(s=>s===sessionId);  //this function is used to find the index of the session
                if(exist===-1){  //this function is used to check if the session is not already in the array
                    set({sessions:[sessionId,...sessions]});  //this function is used to set the sessions
                }
            },
            removeSession:sessionId=>{  //this function is used to remove the session
                const {sessions}=get();  //this function is used to get the sessions
                const update=sessions.filter(s=>s!==sessionId);  //this function is used to filter the sessions
                set({
                    sessions:update,  //this function is used to set the sessions
                })
            },
            clear:()=>set({user:null,sessions:[]})  //this function is used to clear the user and sessions          

        }),
        {
            name:'user-storage',  //this function is used to set the name of the storage
            storage:createJSONStorage(()=>mmkvStorage)  //this function is used to create the storage
        }
    )
 )

