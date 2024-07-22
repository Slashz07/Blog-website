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

  async createAccount({emailId,password,name}) {
    // eslint-disable-next-line no-useless-catch
    try {
      const userAccount = await this.account.create(ID.unique(), emailId, password, name)
      if (userAccount) {
        return await this.loginUser({emailId,password})
      } else {
        return userAccount
      }
    } catch (error) {
      throw error;
    }
  }

  async loginUser({emailId,password}) {
    // eslint-disable-next-line no-useless-catch
    try {
      await this.account.createEmailPasswordSession(emailId,password)
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