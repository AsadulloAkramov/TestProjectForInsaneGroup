import {BaseRepository} from '../../../core/baseRepository';
import {CreatePostDTO, GetPostByIdDTO} from '../dtos/PostDTO';
import {ICreatePostTask, Post} from '../../../domain/Entities/post';
import {CreatePostTaskRequest} from '../../../domain/Entities/post/CreatePostTaskRequest';
import {PostService} from '../service/PostService';
import {PaginateOptions} from "../../../domain/Entities/infra";
import {APPLICATION_MODELS} from "../../../core/models";

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

  async getAllPostsWithPagination(options: PaginateOptions) {
    try {
        return await this.paginate(APPLICATION_MODELS.POST, options);
    }
    catch (err) {
      throw err;
    }
  }

  async getPostById(getPostByIdDTO: GetPostByIdDTO): Promise<Post> {
    try {
      return await this.postService.getPostById(getPostByIdDTO.id);
    } catch (err) {
      throw err;
    }
  }
}
