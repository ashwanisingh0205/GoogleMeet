import { createContext, useContext, useEffect, useRef } from 'react';  //this function is used to create the createContext, useContext, useEffect, useRef
import {io} from 'socket.io-client';  //this function is used to create the io
import { SOCKET_URL } from '../config';  //this function is used to create the SOCKET_URL
const WScontext = createContext();  //this function is used to create the WScontext

export const WSprovider = ({children})=>{  //this function is used to create the WSprovider
const socket = useRef();     //this function is used to create the socket
useEffect(()=>{
    socket.current = io(SOCKET_URL,{  //this function is used to create the socket
        transports:['websocket'],  //this function is used to create the socket
    });
    return()=> socket.current?.disconnect();  //this function is used to disconnect the socket
},[]);
const emit = (event,data)=>{  //this function is used to emit the event
    socket.current?.emit(event,data);  //this function is used to emit the event
};
const on = (event,cb)=>{  //this function is used to on the event
    socket.current?.on(event,cb);  //this function is used to on the event
};
const off = event=>{  //this function is used to off the event
    socket.current?.off(event);  //this function is used to off the event
};
const removeListener = listenerame=>{  //this function is used to remove the listener
        socket.current?.removeListener(listenerame);  //this function is used to remove the listener
};
    const disconnect = () => {
    if (socket.current) {    //this function is used to disconnect the socket
      socket.current.disconnect();  //this function is used to disconnect the socket
      socket.current=undefined;  //this function is used to set the socket to undefined
    }
  };
const socketService = {
    initializeSocket:()=>{},  //this function is used to initialize the socket
    emit,  //this function is used to emit the event
    on,  //this function is used to on the event
    off,  //this function is used to off the event
    removeListener,  //this function is used to remove the listener
    disconnect,  //this function is used to disconnect the socket
};
return(
    <WScontext.Provider value={socketService}>{children}</WScontext.Provider>  //this function is used to return the children
);
};
// };
export const useWs = ()=>{
    const socketServise = useContext(WScontext);  //this function is used to get the socket service
    if(!socketServise){
        throw new Error('useWs must be in WSprovider');  //this function is used to throw an error if the socket service is not found

    }
    return socketServise;  //this function is used to return the socket service
};
