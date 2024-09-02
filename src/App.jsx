import { useState,useEffect } from 'react'
import './App.css'
import {useDispatch} from "react-redux"
import authService from "./appwrite/auth.js"
import { login, logout } from './features/authSlice.js'
import {Header,Footer} from "./components/index.js"
import { Outlet } from 'react-router-dom'


function App() {
const [loading,setLoading]=useState(true)
const dispatch=useDispatch()

useEffect(()=>{
  authService.getCurrentUser()
  .then((userData)=>{

    if(userData){
      dispatch(login({userData}))//login is called in case user closes and open app againwhile the session in apprwrite is still going on,we must ensure our redux store remanins updated since it resets when closed 
    }else{
      dispatch(logout())//must ensure that our store must remain updated
    }

  }).catch((error)=>{console.log("user isnt logged in,Error: ",error)})
  .finally(()=>setLoading(false))
})

return !loading ? (
  <div className='min-h-screen flex flex-col bg-gray-400'>
    <Header className="flex-none"/> 
    <main className='flex-1 p-2'>
      <Outlet/>
    </main>
    <Footer className="flex-none"/> 
  </div>
) : (
  <div className='min-h-screen flex flex-col bg-gray-400'>
  <Header className="flex-none"/> 
  <main className='flex justify-center items-center p-2' style={{height:"40vh"}}>
   <b> <h1 className='text-3xl'>Loading...</h1></b>
  </main>
  <Footer className="flex-none"/> 
</div>
)
}

export default App
