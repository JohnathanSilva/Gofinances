import React ,{ createContext, ReactNode, useContext, useEffect, useState } from "react";

import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

interface AuthProvaiderProps{
    children: ReactNode;
}

interface User {
    id: string;
    name: string;
    email: string;
    photo?: string;
}

interface IAuthContextData {
    user: User;
    signInWithGoogle(): Promise<void>;
    signInWithApple(): Promise<void>;
}

interface AuthResponse{
    params: {
        access_token: string; 
    },
    type: string;
}

export const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({children}: AuthProvaiderProps) {
    const [user, setUser] = useState<User>({} as User);
    const [isLoading, setIsloading] = useState(true);
    const userStoragekey = '@gofinances:user';

    async function signInWithGoogle(){
        try {
            const RESPONSE_TYPE = 'token';
            const SCOPE = encodeURI('profile email');

            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

            const { type, params} = await AuthSession.startAsync({ authUrl }) as AuthResponse;
        
            if(type === "success"){
                const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
                const userInfo = await response.json(); 
                
                setUser({
                    id: userInfo.id,
                    email: userInfo.email,
                    name: userInfo.given_name,
                    photo: userInfo.picture
                });
            }
        } catch ( error ) {
            throw new Error(error as string);
        }
    }

    async function signInWithApple() { 
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes:[
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ]
            });

            if(credential){
                const userInfo = {
                    id: String(credential.user),
                    email: credential.email!,
                    name: credential.fullName?.givenName!,
                    photo: undefined
                }
                setUser(userInfo);
                await AsyncStorage.setItem(userStoragekey, JSON.stringify(userInfo));
            }
            
        } catch (error) {
            throw new Error(error as string);
        }
    }
    
    useEffect(() => {
        async function loadUserStorage() {
            const userStorage = await AsyncStorage.getItem(userStoragekey);

            if(userStorage){
                const userLogged = JSON.parse(userStorage) as User;
                setUser(userLogged);
            }
            setIsloading(false);
        }
        loadUserStorage();    
    }, []);

    return(
        <AuthContext.Provider value={{ user, signInWithGoogle, signInWithApple }}>
          {children}
        </AuthContext.Provider>)
}

function useAuth(){
    const context = useContext(AuthContext);

    return context;
}

export {AuthProvider, useAuth};