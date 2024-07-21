import { Client, Account, ID } from "appwrite";
import configEnvVar from "../configure/config";
class AuthService {
  client = new Client()
  account
  constructor() {
    this.client
      .setEndpoint(configEnvVar.appwriteUrl)
      .setProject(configEnvVar.appwriteProjectId)
    this.account=new Account(this.client)
  }
  
}

const authService = new AuthService()

export default authService