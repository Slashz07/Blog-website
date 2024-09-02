import { useState,useEffect } from 'react'
import { PostCard,Container } from '../components'
import blogDetails from '../appwrite/blogDetailsStore'

function Home() {
    const [posts,setPosts]=useState("")
    useEffect(()=>{
        blogDetails.getAllBlogs().then((posts)=>{
            console.log(posts)
            if(posts){
                setPosts(posts.documents)
            console.log(posts.documents)
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
    }else  if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                            Be the first to write a blog!
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
                    <div className='flex flex-wrap'>
                        {posts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                { console.log(post)}
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        )
    }
    }


export default Home