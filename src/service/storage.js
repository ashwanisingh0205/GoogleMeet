import {MMKV} from 'react-native-mmkv';
export const storage = new MMKV({
id: 'user_storage',
 encryptionKey: 'some-secret-key',
});
export const mmkvStorage = {
setItem:(key,value) =>{
    storage.set(key,value);
},
getItem:key=>{
    if(storage.contains(key)){
        if(storage.getString(key) !== null) {return storage.getString(key);}
        if(storage.getNumber(key) !== null) {return storage.getNumber(key);}
        if(storage.getBoolean(key) !== null) {return storage.getBoolean(key);}
    }
    return null;


//     const value = storage.getString(key);
// return value ?? null;
},
removeItem:key => {
storage.delete(key);
},
};
