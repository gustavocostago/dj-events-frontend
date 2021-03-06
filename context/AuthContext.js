import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
  const router = useRouter()
  const[user,setUser] = useState()
  const[error,setError] = useState()

  useEffect(()=>checkUserLoggedIn(),[])
  //Register User
  const register = async (user) =>{
    const res = await fetch(`http://localhost:3000/api/register`,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(user)
    })
    const data = await res.json()
    if(res.ok){
      setUser(data.user)
      router.push('/account/dashboard')
    }else{
      setError(data.message)
      setError(null)
    }
  }
  //Login User
  const login = async ({email:identifier,password}) =>{
    const res = await fetch(`http://localhost:3000/api/login`,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({identifier,password})
    })
    const data = await res.json()
    if(res.ok){
      setUser(data.user)
      router.push('/account/dashboard')
    }else{
      setError(data.message)
      setError(null)
    }
  }
  //Logout User
  const logout = async () =>{
    const res = await fetch(`http://localhost:3000/api/logout`,{
      method: 'POST'
    })
    if(res.ok){
      setUser(null)
      router.push('/')
    }
  }
  //Check if  user is logged in
  const checkUserLoggedIn = async (user) =>{
    const res = await fetch('http://localhost:3000/api/user')
    const data = await res.json()
    if(res.ok){
      setUser(data.user)
    }else{
      setUser(null)
    }
  }

  return(
    <AuthContext.Provider value={{user,error,register,login,logout}}>
      {children}
    </AuthContext.Provider>
  )
}
export default AuthContext;