import { useDispatch } from 'react-redux'
import { logout } from '../../features/authSlice.js'
import authService from '../../appwrite/auth.js'
import { useNavigate } from 'react-router-dom'


function LogoutBtn() {

  const dispatch=useDispatch()
  const navigate=useNavigate()

  function logoutHandler(){
    authService.userLogout().then(()=>dispatch(logout()))
    navigate("/")
    
  }

  return (
    <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={logoutHandler} >Logout</button>
  )
}

export default LogoutBtn