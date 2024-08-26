import {useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function AuthLayout ({children,authentication=true}) {

    const navigate=useNavigate()
    const authStatus=useSelector((state)=>state.auth.status)
    const [loader,setLoader]=useState(true)

    useEffect(()=>{
      if(authentication && authStatus!==authentication){
        navigate("/login")//this executes in situation when user isnt logged in but tries to access auth protected content
      }else if(!authentication && authStatus!==authentication){
        navigate("/")//this executes in situation when user is already logged in but still attempts to go to login page for which(login page) authentication is set to false
      }
      setLoader(false)
    },{authStatus,navigate,authentication})

  return loader ? <h1>Loading...</h1>:<>{children}</> //this executes when user isnt logged in and tries to acess login page for which obviously the authentication is set to false so that user can get authenticated
}
