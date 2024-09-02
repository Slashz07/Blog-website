import {useCallback, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import {RTE,Button,Input,Select} from "../index.js"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import appwriteService from "../../appwrite/blogDetailsStore.js"
import uploadFiles from "../../appwrite/mediaUpload.js"
import { v4 as uuidv4 } from 'uuid';


function PostForm({post}) {

    const navigate=useNavigate()
    const userData=useSelector((state)=>state.auth.userData)
    const {register,handleSubmit,getValues,setValue,watch,control}=useForm({
        defaultValues:{
            title:post?.title||"",
            slug:post?.slug||"",
            content:post?.content||"",
            status:post?.status||""
        }
    })

    const submit=async (data)=>{
        if(post){
            const file=data.image[0] ? await uploadFiles.uploadFile(data.image[0]):null
            if(file){
                uploadFiles.deleteFile(post.featuredImage)
            }

            const dbPost= await appwriteService.updateBlog(
                post.$id,
                {
                    ...data,
                    featuredImage:file?file.$id:undefined
                }
            )

            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
        }else{
            console.log(data.content,typeof(data.content))

            const file=data.image[0]? await uploadFiles.uploadFile(data.image[0]):null
            
            const dbPost=await appwriteService.createBlog({
                ...data,
                featuredImage:file?file.$id:undefined,
                userId:userData.$id,
                blogId:uuidv4()
            })
            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
        }
    }

    const slugTransform=useCallback((value)=>{
        if(value && typeof value=="string"){
            return value
                    .trim()
                    .toLowerCase()
                    .replace(/[^a-zA-Z\d]+/g,'-')
        }
        return ""

    },[])

    useEffect(()=>{
        const subsciption=watch((value,{name})=>{//watch observes the entire form fields and if any change occurs the name here will be the field's name that changed and value is the actual changed value
            if(name==="title"){
                setValue("slug",slugTransform(value.title),{shouldValidate:true})
            }
        })
        return ()=>{
            subsciption.unsubscribe()
        }
    },[watch,slugTransform,setValue])

  return (
    <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
        <div className='w-2/3 px-2'>
            <Input
            label="Title: "
            name="title"
            placeholder="title"
            className="mb-4"
            {...register("title",{
                required:true
            })}
            />
             <Input
             label="Slug: "
             name="slug"
             placeholder="slug"
             className="mb-4"
             {...register("slug",{
                 required:true
             })}
             onInput={(e)=>{
                setValue("slug",slugTransform(e.currentTarget.value),{shouldValidate:true})
             }}
             />
             <RTE
             label="Content: "
             name="content"
             control={control}
             defaultValue={getValues("content")}
             />
        </div>
      <div className='w-1/3 px-2'>
        <Input
             label="Featured Image: "
             type="file"
             accept="image/jpg,image/png,image/jpeg,image/gif"
             className="mb-4"
             {...register("image",{
                 required:!post
             })}
             />
        {post && (
            <div
            className='w-full mb-4'
            >
                <img src={uploadFiles.getFilePreview(post.featuredImage)} alt={post.title} 
                className='rounded-lg'
                />
            </div>
        )}

        <Select
        label="Status: "
        name="status"
        options={["active","inactive"]}
        className="mb-4"
        {...register("status",{required:true})}
        />

        <Button
        type="submit"
        text={post?"Update":"Submit"}
        className='w-full'
        bg-color={post? "bg-green-500":undefined}
        />
      
      </div>
    </form>
  )
}

export default PostForm