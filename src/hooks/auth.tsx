import React ,{ createContext, ReactNode, useContext } from "react";

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
}

export const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({children}: AuthProvaiderProps) {
    const user = {
        id: '01',
        name: 'Johnathan',
        email: 'johnathan@email.com', 
    }

    return(
        <AuthContext.Provider value={{ user }}>
          {children}
        </AuthContext.Provider>)
}

function useAuth(){
    const context = useContext(AuthContext);

    return context;
}

export {AuthProvider, useAuth};