import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from "./store/store.js"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {Home,SignUpPage,LoginPage, AllPosts, AddPost, EditPost,Post} from './pages/index.js'
import AuthLayout from './components/AuthLayout.jsx'



const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/login",
        element:(
        <AuthLayout authentication="false">
          <LoginPage/>
        </AuthLayout>
        )
     },
      {
        path:"/signup",
        element:(
        <AuthLayout authentication="false">
          <SignUpPage/>
        </AuthLayout>
        )
     },
      {
        path:"/all-posts",
        element:(
        <AuthLayout authentication>
          <AllPosts/>
        </AuthLayout>
        )
     },
      {
        path:"/add-post",
        element:(
        <AuthLayout authentication>
          <AddPost/>
        </AuthLayout>
        )
     },
      {
        path:"/edit-post/:slug",
        element:(
        <AuthLayout authentication>
          <EditPost/>
        </AuthLayout>
        )
     },
      {
        path:"/post/:slug",
        element:<Post/>
     },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
