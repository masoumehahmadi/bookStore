import {useState,createContext} from 'react'


export const AuthContext = createContext();

export default function AuthContextProvider({children}) {
  const [authState,setAuthState]=useState({
    token:localStorage.getItem("token")||"",
  })
  return (
    <AuthContext.Provider value={{authState,setAuthState}}>
    {children}
    </AuthContext.Provider>
  )
}
