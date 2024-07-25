import { Client, ID } from "appwrite";
import configEnvVar from "../configure/config";

class mediaUpload{
    client=new Client
    bucket

    constructor(){
        this.client
        .setEndpoint(configEnvVar.appwriteUrl)
        .setProject(configEnvVar.setProject)
        this.bucket=new Storage(this.client)
    }

    async uploadFile(file){
        // eslint-disable-next-line no-useless-catch
        try {
            return await this.bucket.createFile(
                configEnvVar.bucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            throw error
        }
    }

}

const uploadFiles=new mediaUpload()
export default uploadFiles 