import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../features/authSlice.js'
import authService from '../../appwrite/auth.js'


function LogoutBtn() {

  const dispatch=useDispatch()

  function logoutHandler(){
    authService.userLogout().then(()=>dispatch(logout()))
  }

  return (
    <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={logoutHandler} >Logout</button>
  )
}

export default LogoutBtn