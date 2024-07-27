import { Client, Databases, ID, Query, Storage } from "appwrite";
import config from "../cofig/config";
export class DatabaseService {
  client = new Client();
  databases;
  storage;
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  // Database part
  async createPost({ Title, slug, Content, Img, status, userId }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        { Title, Content, Img, status, userId }
      );
    } catch (err) {
      console.log("DataBase Service :: createPost Delete", err);
    }
  }
  async updatePost(slug, { Title, Content, Img, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        { Title, Content, Img, status }
      );
    } catch (err) {
      console.log("Database Service :: updatePost error", err);
    }
  }
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (err) {
      console.log("Database Service :: deletePost error", err);
      return false;
    }
  }
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
    } catch (err) {
      console.log("Database Service :: getPost error", err);
      return false;
    }
  }
  async getPosts() {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        [Query.equal("status", ["active"])]
      );
    } catch (err) {
      console.log("Database Service :: getPosts error", err);
      return false;
    }
  }

  // file upload services(storage)

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (err) {
      console.log("Storage Service :: uploadFile error", err);
      return false;
    }
  }
  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(config.appwriteBucketId, fileId);
      return true;
    } catch (err) {
      console.log("Storage Service :: deleteFile error", err);
      return false;
    }
  }
  getFilePreview(fileId) {
    return this.storage.getFilePreview(config.appwriteBucketId, fileId);
  }
}

const databaseUser = new DatabaseService();

export default databaseUser;
