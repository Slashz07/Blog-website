import { Client,Databases,Query,Storage } from "appwrite";
import configEnvVar from "../configure/config";

class BlogDetails{
    client=new Client()
    databases
    bucket
    constructor(){
        this.client
        .setEndpoint(configEnvVar.appwriteUrl)
        .setProject(configEnvVar.appwriteProjectId)
        this.databases=new Databases(this.client)
        this.bucket=new Storage(this.client)
    }

    async createBlog({title,blogId,slug,content,featuredImage,status,userId}){
        // eslint-disable-next-line no-useless-catch
        try {
           return await this.databases.createDocument(
                configEnvVar.databaseId,
                configEnvVar.collectionId,
                blogId,
                {
                title,
                slug,
                content,
                featuredImage,
                status,
                userId          
                }
            )
        } catch (error) {
            throw error
        }
    }

    async updateBlog(blogId,   {
        title,
        content,
        slug,
        featuredImage,
        status        
        }){
            // eslint-disable-next-line no-useless-catch
            try {
                

                if (featuredImage == undefined) {
                    return await this.databases.updateDocument(
                        configEnvVar.databaseId,
                        configEnvVar.collectionId,
                        blogId,
                        {
                            title,
                            content,
                            slug,
                            status
                        }
                    )
                }else{
                    return await this.databases.updateDocument(
                        configEnvVar.databaseId,
                        configEnvVar.collectionId,
                        blogId,
                        {
                            title,
                            content,
                            slug,
                            status,
                            featuredImage
                        }
                    )
                }
              
            } catch (error) {
                throw error
            }
 
    }

    async deleteBlog(blogId){
        // eslint-disable-next-line no-useless-catch
        try {
             await this.databases.deleteDocument(
                configEnvVar.databaseId,
                configEnvVar.collectionId,
                blogId
            )
            return true
        } catch (error) {
            throw error
        }
  
    }

    async getBlog(blogId){
        // eslint-disable-next-line no-useless-catch
        try {
            return await this.databases.getDocument(
                configEnvVar.databaseId,
                configEnvVar.collectionId,
                blogId
            )
        } catch (error) {
            console.log("could not get any blog with provided id")
            return false
        }
   
    }

    async getAllBlogs(query=[Query.equal("status","active")]){//we have used array since we could apply multiple queries as well
        try {
            return await this.databases.listDocuments(
                configEnvVar.databaseId,
                configEnvVar.collectionId,
                query
            )
        } catch (error) {
            console.log("error occured, could not fetch all the blogs")
            return false
        }
    }
    async getMyBlogs(id,query=[Query.equal("userId",id)]){//we have used array since we could apply multiple queries as well
        try {
            return await this.databases.listDocuments(
                configEnvVar.databaseId,
                configEnvVar.collectionId,
                query
            )
        } catch (error) {
            console.log("error occured, could not fetch all the blogs")
            return false
        }
    }
}

const blogDetails=new BlogDetails()
export default blogDetails