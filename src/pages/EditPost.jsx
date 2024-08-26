import React, { useState,useEffect } from 'react'
import blogDetails from '../appwrite/blogDetailsStore'
import { Container, PostForm } from '../components'
import { useNavigate,useParams } from 'react-router-dom'

function EditPost() {
    const [post,setPost]=useState
    const navigate=useNavigate()
    const {slug}=useParams()

    useEffect(()=>{
        if(slug){
            blogDetails.getBlog(slug).then((post)=>{
                if(post){
                    setPost(post)
                }
            })
        }else{
            navigate("/")
        }
    },[slug,navigate])

  return post?(
    <div className='py-8'>
        <Container>
            <PostForm post={post}/>
        </Container>
    </div>
  ):null
}

export default EditPost