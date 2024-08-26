import React from 'react'
import { useState,useEffect } from 'react'
import parse from "html-react-parser"
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import blogDetails from '../appwrite/blogDetailsStore'
import uploadFiles from '../appwrite/mediaUpload'
import { Container,Button } from '../components'
import { Link } from 'react-router-dom'

function Post() {

    const [post,setPost]=useState(null)
    const navigate=useNavigate()
    const {slug}=useParams()
    const loggedUser=useSelector((state)=>state.auth.userData)
    const isAuthor=loggedUser&&post ? loggedUser.$id===post.userId : false

    useEffect(()=>{
        if(slug){
            blogDetails.getBlog(slug).then((post)=>{
                if(post){
                    setPost(post)
                }else navigate("/")
            })
        }
    },[navigate,slug])

    const deletePost=()=>{
        blogDetails.deleteBlog(slug).then((status)=>{
            if(status){
                uploadFiles.deleteFile(post.featuredImage)
                navigate("/")
            }
        })
    }

  return post?(
    <div className='py-8'>
        <Container>
            <div className='w-full flex justify-center mb-4 relative border rounded-xl p-2'>
                <img src={uploadFiles.getFilePreview(post.featuredImage)} alt={post.title} />
                {isAuthor&&(
                    <div className='absolute right-6 top-6'>
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button
                            bgColor='bg-green-500'
                            className='mr-3'
                            >
                                Edit
                            </Button>
                        </Link>
                        <Button
                        bgColor='bg-red-500'
                        onClick={deletePost}
                            >
                            Delete
                        </Button>
                    </div>
                )}
            </div>
            <div className='w-full mb-6'>
                    <h1 className='text-2xl font-bold'>
                        {post.title}
                    </h1>

            </div>
            <div className='browser-css'>
                {parse(post.content)}
            </div>
        </Container>
    </div>
  ):null
}

export default Post