import {useState,useEffect} from 'react'
import { Container,PostCard } from '../components'
import blogDetails from '../appwrite/blogDetailsStore'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function MyPosts() {
  const [posts,setPosts]=useState("")
  const userData=useSelector((state)=>state.auth.userData);
    useEffect(()=>{
        blogDetails.getMyBlogs(userData.$id).then((posts)=>{
            if(posts){
                setPosts(posts.documents)
            }
        })
    },[])
    
    if (!posts) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="flex justify-center items-center p-2 w-full">
                        <b> <h1 className='text-3xl'>Loading...</h1></b>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
   else if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                            You have not created any blog yet
                            <Link to="/add-post">Click here to create a new blog</Link>
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }else{
        return (
            <div className='w-full py-8'>
                <Container>
                    <div className='flex flex-wrap post-container'>
                        {posts.map((post) => (
                            <div key={post.$id} className='post-card p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        )
    }
}

export default MyPosts