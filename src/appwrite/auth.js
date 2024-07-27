import { Client, Account, ID } from "appwrite";
import config from "../cofig/config";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }
  async createAccount({ email, password, name }) {
    try {
      const response = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (response) {
        return this.login({ email, password });
      } else {
        return response;
      }
    } catch (err) {
      console.log(
        "Authentication service :: Appwrite :: SignUp Service ::",
        err
      );
      return err;
    }
  }
  async login({ email, password }) {
    try {
      const response = await this.account.createEmailPasswordSession(
        email,
        password
      );
      return response;
    } catch (err) {
      console.log(
        "Authentication service :: Appwrite :: Login Service ::",
        err
      );
      return err;
    }
  }
  async getCurrentAccount() {
    try {
      const user = await this.account.get();
      if (user) {
        return user;
      } else {
        return null;
      }
    } catch (err) {
      console.log(
        "Authentication service :: Appwrite :: getCurrentAccount Service ::",
        err
      );
    }
  }
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (err) {
      console.log("Authentication service :: Appwrite :: Logout Session", err);
    }
  }
}

const authService = new AuthService();

export default authService;
