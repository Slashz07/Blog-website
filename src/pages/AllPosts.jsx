import {useState,useEffect} from 'react'
import { Container,PostCard } from '../components'
import blogDetails from '../appwrite/blogDetailsStore'



function AllPosts() {
  const [posts,setPosts]=useState([])
    useEffect(()=>{
        blogDetails.getAllBlogs([]).then((posts)=>{
            if(posts){
                setPosts(posts.documents)
            }
        })
    },[])
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                            Log in to view the blogs
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

export default AllPosts