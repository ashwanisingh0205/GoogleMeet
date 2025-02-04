import {create} from 'zustand';
import {persist,createJSONStorage} from 'zustand/middleware';
import {mmkvStorage} from './storage';

 export  const LiveStore = create()(

        (set,get)=>({}),
        {
            name:'live-storage',
            storage:createJSONStorage(()=>mmkvStorage),
        }

 );

