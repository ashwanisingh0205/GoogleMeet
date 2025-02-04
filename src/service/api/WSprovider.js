import { createContext, useContext, useEffect, useRef } from 'react';
import {io} from 'socket.io-client';
import { SOCKET_URL } from '../config';
const WScontext = createContext();

export const WSprovider = ({children})=>{
const socket = useRef();
useEffect(()=>{
    socket.current = io(SOCKET_URL,{
        transports:['websocket'],
    });
    return()=> socket.current?.disconnect();
},[]);
const emit = (event,data)=>{
    socket.current?.emit(event,data);
};
const on = (event,cb)=>{
    socket.current?.on(event,cb);
};
const off = event=>{
    socket.current?.off(event);
};
const removeListener = listenerame=>{
socket.current?.removeListener(listenerame);
};
const disconnect = () => {
    if (socket.current) {
      socket.current.disconnect();
      socket.current=undefined;
    }
  };
const socketService = {
    initializeSocket:()=>{},
    emit,
    on,off,
    removeListener,
    disconnect,
};
return(
    <WScontext.Provider value={socketService}>{children}</WScontext.Provider>
);
};
// };
export const useWs = ()=>{
    const socketServise = useContext(WScontext);
    if(!socketServise){
        throw new Error('useWs must be in WSprovider');

    }
    return socketServise;
};
