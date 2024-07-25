import { Client,Databases,Storage } from "appwrite";
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

    async createBlog({title,slug,content,featuredImage,status,userId}){
        // eslint-disable-next-line no-useless-catch
        try {
            await this.databases.createDocument(
                configEnvVar.databaseId,
                configEnvVar.collectionId,
                slug,
                {
                title,
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

    async updateBlog(slug,   {
        title,
        content,
        featuredImage,
        status        
        }){
            // eslint-disable-next-line no-useless-catch
            try {
                return await this.databases.updateDocument(
                    configEnvVar.databaseId,
                    configEnvVar.collectionId,
                    slug,
                    {
                        title,
                        content,
                        featuredImage,
                        status
                    }
                )
            } catch (error) {
                throw error
            }
 
    }

    async deleteBlog(slug){
        // eslint-disable-next-line no-useless-catch
        try {
             await this.databases.deleteDocument(
                configEnvVar.databaseId,
                configEnvVar.collectionId,
                slug
            )
            return true
        } catch (error) {
            throw error
        }
  
    }

    async getBlog(slug){
        // eslint-disable-next-line no-useless-catch
        try {
            return await this.databases.getDocument(
                configEnvVar.databaseId,
                configEnvVar.collectionId,
                slug
            )
        } catch (error) {
            console.log("could not get any blog with provided id")
            return false
        }
   
    }
}

const blogDetails=new BlogDetails()
export default blogDetails