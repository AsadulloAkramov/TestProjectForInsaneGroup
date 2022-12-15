import { APPLICATION_MODELS } from '../models';
import { UserService } from '../../modules/user/service/UserService';
import { PaginateOptions, PaginationListDTO } from '../../domain/Entities/infra';

export abstract class BaseRepository {
  protected async findAll(model: APPLICATION_MODELS, options: PaginateOptions) {
    if (model == APPLICATION_MODELS.USER) {
      const userService = new UserService();
      return await userService.getAllUsers(options);
    }
    if (model == APPLICATION_MODELS.POST) {
      // return all posts as array
    }
  }

  protected async paginate<T>(model: APPLICATION_MODELS, options: PaginateOptions): Promise<PaginationListDTO<T>> {
    let offset: number = 0;
    let limit: number = 5;

    if (options) {
      if (options.offset) {
        offset = options.offset;
      }

      if (options.limit) {
        limit = options.limit;
      }
    }

    const allModelData = await this.findAll(model, options);
    let items: any[];
    if (model == APPLICATION_MODELS.USER) {
      items = allModelData.users;
    }
    if (model == APPLICATION_MODELS.POST) {
      // posts
      // const items: any[] = allModelData.users;
    }

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
