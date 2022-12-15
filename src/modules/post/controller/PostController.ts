import { BaseController } from '../../../core/baseController';
import { Request, Response } from 'express';
import { CreatePostDTO, GetPostByIdDTO } from '../dtos/PostDTO';
import { PostRepository } from '../repository/PostRepository';
import { AuthRepository } from '../../auth/repository/authRepository';
import { UserRepository } from '../../user/repository/UserRepository';
import { Post } from '../../../domain/Entities/post';
import PostValidationSchema from '../http/validation/post';
import { Validate } from '../../../core/http/middlewares/ValidatorRequest';
export class PostController extends BaseController {
  private postRepository = new PostRepository();
  private authRepository = new AuthRepository();
  private userRepository = new UserRepository();

  @Validate(PostValidationSchema.create)
  async createPost(req: Request, res: Response) {
    try {
      const body: CreatePostDTO = req.body;
      const bearerToken: string = req.headers.authorization;
      const accessToken: string = bearerToken.split(' ')[1];

      const jwtClaims = await this.authRepository.decodedUser(accessToken);
      const user = await this.userRepository.getUserById(jwtClaims.userId);
      if (!user) {
        this.unAuthorized(res, 'Unauthorized, to leave a post please create your account first');
      }
      const newPost = await this.postRepository.createPost(body, user.id);
      this.ok(res, newPost);
    } catch (err) {
      this.fail(res, err.message);
    }
  }

  async getAllPosts(req: Request, res: Response) {
    try {
    } catch (err) {}
  }

  @Validate(PostValidationSchema.getPostById)
  async getPostById(req: Request, res: Response) {
    try {
      const params: GetPostByIdDTO = {
        id: Number(req.params.id)
      };
      const post: Post = await this.postRepository.getPostById(params);
      if (!post) {
        this.notFound(res, 'Post with that id not found');
      }
      this.ok(res, post);
    } catch (err) {
      this.fail(res, err.message);
    }
  }
}
