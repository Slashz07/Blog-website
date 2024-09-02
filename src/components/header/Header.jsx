import {Container,Logo,LogoutBtn} from "../index.js"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'


function Header() {

  const loginStatus=useSelector((state)=>state.auth.status)
  const navigate=useNavigate()

  const navItems=[
    {
      name:"Home",
      slug:"/",
      active:"true"
    },
    {
      name:"Login",
      slug:"/login",
      active:!loginStatus
    },
    {
      name:"Sign Up",
      slug:"/signup",
      active:!loginStatus
    },
    {
      name:"Add Posts",
      slug:"/add-post",
      active:loginStatus
    },
    {
      name:"All Posts",
      slug:"/all-posts",
      active:loginStatus
    },
  ]

  return (
<header className='py-3 shadow bg-gray-500'>
  <Container>
    <nav className='flex'>
      <div className='mr-4'>
        <Link to='/'>
        <Logo size='50px'/>
        </Link>
      </div>
    <ul className='flex ml-auto'>
      {navItems.map((item,index)=> 
       item.active ? (
        <li key={index}>
          <button
          className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
          onClick={()=>navigate(item.slug)}//we can use either from link and navigate,both perform same work
          >{item.name}</button>
        </li>
       ):null )}

       {loginStatus&&(
        <li><LogoutBtn/></li>
       )}
    </ul>
    </nav>
  </Container>
</header>
  )
}

export default Header