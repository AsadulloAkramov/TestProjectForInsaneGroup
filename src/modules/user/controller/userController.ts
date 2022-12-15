import { BaseController } from '../../../core/baseController';
import { Request, Response } from 'express';
import { CreateUserDTO } from '../dtos/UserDTO';
import { UserRepository } from '../repository/UserRepository';
import { Validate } from '../../../core/http/middlewares/ValidatorRequest';
import UserValidationSchema from '../http/validation/user';
import {PaginateOptions} from "../../../domain/Entities/infra";

export class UserController extends BaseController {
  private userRepository = new UserRepository();
  constructor() {
    super();
  }

  @Validate(UserValidationSchema.create)
  async create(req: Request, res: Response) {
    try {
      const body: CreateUserDTO = req.body;
      const newUser = await this.userRepository.createUser(body);

      this.ok(res, newUser);
    } catch (error) {
      return this.fail(res, error.message);
    }
  }

  @Validate(UserValidationSchema.listUsers)
  async listUsers(req: Request, res: Response) {
    try {
      const options: PaginateOptions = {
        offset: +req.query.offset,
        limit: +req.query.limit
      };
      const paginatedUsers = await this.userRepository.getAllUsers(options);
      this.ok(res, paginatedUsers);
    } catch (err) {
      return this.fail(res, err.message);
    }
  }
}
