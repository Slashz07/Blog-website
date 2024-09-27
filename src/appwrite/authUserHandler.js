import { Client,Users } from "node-appwrite";

import configEnvVar from "../configure/config";


class AuthUser {
  client = new Client()
  account
  users;
  constructor() {

    this.client
      .setEndpoint(configEnvVar.appwriteUrl)
      .setProject(configEnvVar.appwriteProjectId)
      .setKey(configEnvVar.appwriteAuthAPI)

    this.users=new Users(this.client)

  }

  async getUser(userId) {
    try {
      return await this.users.get(userId);
    } catch (error) {
      console.log("Could not fetch user with the provided id:", error);
      return false;
    }
  }
  
}



const authUser = new AuthUser()

export default authUser