import { BaseController } from '../../../core/baseController';
import { Request, Response } from 'express';
import { CreatePostDTO } from '../dtos/PostDTO';
import { PostRepository } from '../repository/PostRepository';
import { AuthRepository } from '../../auth/repository/authRepository';
import { UserRepository } from '../../user/repository/UserRepository';

export class PostController extends BaseController {
  private postRepository = new PostRepository();
  private authRepository = new AuthRepository();
  private userRepository = new UserRepository();

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
}
