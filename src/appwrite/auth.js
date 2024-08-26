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

  async createAccount({email,password,name}) {
    // eslint-disable-next-line no-useless-catch
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name)
      if (userAccount) {
        return await this.loginUser({email,password})
      } else {
        return userAccount
      }
    } catch (error) {
      throw error;
    }
  }

  async loginUser({email,password}) {
    // eslint-disable-next-line no-useless-catch
    try {
      return await this.account.createEmailPasswordSession(email,password)
    } catch (error) {
      throw error
    }
  }

  async getCurrentUser(){
    // eslint-disable-next-line no-useless-catch
    try {
      return await this.account.get()
    } catch (error) {
      throw error
    }//return null
  }

  async userLogout(){
    // eslint-disable-next-line no-useless-catch
    try {
      return await this.account.deleteSessions()
    } catch (error) {
      throw error
    }
  }
}

const authService = new AuthService()

export default authService