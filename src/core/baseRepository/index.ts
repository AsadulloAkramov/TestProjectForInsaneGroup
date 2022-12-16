import { APPLICATION_MODELS } from '../models';
import { UserService } from '../../modules/user/service/UserService';
import { PaginateOptions, PaginationListDTO } from '../../domain/Entities/infra';
import { PostService } from '../../modules/post/service/PostService';
import { User } from '../../domain/Entities/user';
import { Post } from '../../domain/Entities/post';
import * as process from "process";

type ModelData = {
  totalAmount: number;
  items: User[] | Post[];
};
export abstract class BaseRepository {
  protected async findAll(model: APPLICATION_MODELS, options: PaginateOptions): Promise<ModelData> {
    if (model == APPLICATION_MODELS.USER) {
      const userService = new UserService();
      const modelData = await userService.getAllUsers(options);
      return {
        totalAmount: modelData.totalUsersAmount,
        items: modelData.users
      };
    }
    if (model == APPLICATION_MODELS.POST) {
      const postService = new PostService();
      const modelData = await postService.getAllPosts(options);
      return {
        totalAmount: modelData.totalPostsAmount,
        items: modelData.posts
      };
    }
  }

  protected async paginate<T>(model: APPLICATION_MODELS, options: PaginateOptions): Promise<PaginationListDTO<T>> {
    let offset: number = +process.env.DEFAULT_OFFSET | 0;
    let limit: number = +process.env.DEFAULT_LIMIT | 5;

    if (options) {
      if (options.offset) {
        offset = options.offset;
      }

      if (options.limit) {
        limit = options.limit;
      }
    }

    const allModelData = await this.findAll(model, options);
    let items: any[] = allModelData.items;
    const count = allModelData.totalAmount;

    const page = Math.ceil(offset / limit);
    const totalPages = Math.ceil(count / limit);

    const data: PaginationListDTO<T> = {
      total: count,
      page,
      nextPage: offset,
      prevPage: offset,
      hasNextPage: false,
      hasPrevPage: false,
      limit,
      offset,
      totalPages,
      items
    };

    if (data.page - 1 >= 0) {
      data.prevPage = data.page - 1;
      data.hasPrevPage = true;
    }

    if (data.nextPage + 1 <= totalPages) {
      data.nextPage = data.nextPage + 1;
      data.hasNextPage = true;
    }

    return data;
  }
}
