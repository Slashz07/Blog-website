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

  async createAccount({email,password,name,userImage}) {
    // eslint-disable-next-line no-useless-catch
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name)
      console.log(userAccount)
      if (userAccount) {
        const session=await this.loginUser({email,password})
        await this.updateProfilePic(userImage)
        return session
      } else {
        return userAccount
      }
    } catch (error) {
      throw error;
    }
  }

  async updateProfilePic(userImage){
    return await this.account.updatePrefs({
      userImage
  });
  }

  async loginUser({email,password}) {
    // eslint-disable-next-line no-useless-catch
    try {
      return await this.account.createEmailPasswordSession(email,password)
    } catch (error) {
      throw error
    }
  }

  getUserPreference = async (key) => {
    try {
      const preferences = await this.account.getPreferences();
      const value = preferences[key];
      return value;
    } catch (error) {
      console.error('Error fetching preferences:', error.message);
    }
  };
  

  changePassword = async (currentPassword, newPassword) => {
    // eslint-disable-next-line no-useless-catch
    try {
      await this.account.updatePassword(newPassword, currentPassword);
      console.log('Password updated successfully');
      // Optionally show a success message to the user
    } catch (error) {
      throw error
    }
  };
  
  updateUserName = async (newName) => {
    // eslint-disable-next-line no-useless-catch
    try {
      await this.account.updateName(newName);
    } catch (error) {
      throw error
    }
  };
  

  async getCurrentUser(){
    // eslint-disable-next-line no-useless-catch
    try {
      return await this.account.get()
    } catch (error) {
      return null
    }
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