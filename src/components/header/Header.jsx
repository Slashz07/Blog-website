import { useState } from "react"
import {Container,Logo,LogoutBtn} from "../index.js"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import "../styles/navbar.css"

function Header() {

  const loginStatus=useSelector((state)=>state.auth.status)
  const navigate=useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
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
    {
      name:"My Posts",
      slug:"/my-posts",
      active:loginStatus
    },
    {
      name:"My account",
      slug:"/my-account",
      active:loginStatus
    },
  ]

  return (
<header className='py-3 shadow bg-gray-500'>
  <Container>
  <nav className="flex items-center justify-between">
  <div className="flex items-center">
    <div className="md:hidden mr-4">
      <button onClick={toggleDropdown}>
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>
    </div>
    <ul
      className={`md:flex items-center transition-all duration-500 ease-in-out overflow-hidden ${
        isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
      } md:max-h-none md:opacity-100`}
    >
      {navItems.map(
        (item, index) =>
          item.active && (
            <li key={index} className="md:ml-4">
              <button
                className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                onClick={() => navigate(item.slug)}
              >
                {item.name}
              </button>
            </li>
          )
      )}

      {loginStatus && (
        <li className="md:ml-4">
          <LogoutBtn />
        </li>
      )}
    </ul>
  </div>
  <div className="ml-auto">
    <Link to="/">
      <Logo size="50px" />
    </Link>
  </div>
</nav>

  </Container>
</header>
  )
}

export default Header