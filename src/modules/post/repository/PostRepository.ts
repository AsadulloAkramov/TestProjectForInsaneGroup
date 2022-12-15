import { BaseRepository } from '../../../core/baseRepository';
import { CreatePostDTO } from '../dtos/PostDTO';
import { ICreatePostTask, Post } from '../../../domain/Entities/post';
import { CreatePostTaskRequest } from '../../../domain/Entities/post/CreatePostTaskRequest';
import { PostService } from '../service/PostService';

export class PostRepository extends BaseRepository {
  private postService = new PostService();
  async createPost(postDTO: CreatePostDTO, postAuthorId: number): Promise<Post> {
    try {
      const props: ICreatePostTask = new CreatePostTaskRequest(postDTO.title, postDTO.content, postAuthorId).toObject();
      return this.postService.createPost(props);
    } catch (err) {
      throw err;
    }
  }
}
