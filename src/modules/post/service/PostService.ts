import * as fs from 'fs';
import { ICreatePostTask, Post } from '../../../domain/Entities/post';
import { UserService } from '../../user/service/UserService';
import * as console from 'console';

export class PostService {
  private postJsonDatabasePath: string = process.cwd() + '/src/JSONDatabase/posts.json';

  createPost(postInfo: ICreatePostTask): Post {
    try {
      const newPost: Post = {
        id: 1,
        ...postInfo
      };
      return this.saveNewPostToJSONDatabase(newPost);
    } catch (err) {}
  }

  getPostById(postId: number): Post {
    try {
      const allPostAsJSON = this.readAllPostsFromPostsJson();
      const posts: Post[] = JSON.parse(allPostAsJSON.toString());
      return posts.find((post) => post.id == postId);
    } catch (err) {
      console.log(`Post Service ---> Get Post by id error: ${err.message}`);
      throw err;
    }
  }

  saveNewPostToJSONDatabase(post: Post): Post {
    try {
      const allPost = this.readAllPostsFromPostsJson();
      //check file is empty or not
      if (allPost.length == 0) {
        fs.writeFileSync(this.postJsonDatabasePath, JSON.stringify([post]));
      } else {
        // append new post to posts.json file
        const posts: Post[] = JSON.parse(allPost.toString());
        post.id = posts.length + 1;
        posts.push(post);
        fs.writeFileSync(this.postJsonDatabasePath, JSON.stringify(posts));
      }
      // save user post id into its postID list
      const userService = new UserService();
      userService.saveUserPostsListByPostId(post.id, post.author.id);
      return post;
    } catch (err) {
      console.log(`Post Service ---> savePostToJSONDatabase Error: ${err.message}`);
      throw err;
    }
  }

  readAllPostsFromPostsJson() {
    return fs.readFileSync(this.postJsonDatabasePath);
  }
}
