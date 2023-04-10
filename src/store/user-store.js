import { create } from 'zustand';
import RetrieveStoredToken from '../components/shared/RetrieveStoredToken';

const tokenData = RetrieveStoredToken();

let initialToken;
let timer;
if(tokenData){
    initialToken = tokenData.token;
    timer = tokenData.duration
}

const useUserStore = create((set, get) => ({
    token: initialToken, 
    isLoggedIn: !!initialToken,
    logoutTimer: timer,
    setToken: (token) => set(()=>({token:token})),
    setisLoggedIn: (bool) => set(()=>({isLoggedIn:bool})),
    logoutHandler: (token, isLoggedIn) => {
        set(()=>({token:null, isLoggedIn:false, logoutTimer:null})); 
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
    }
}));

export default useUserStore;