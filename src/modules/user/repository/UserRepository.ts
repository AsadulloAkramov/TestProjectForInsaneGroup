import { CreateUserDTO } from '../dtos/UserDTO';
import { User } from '../../../domain/Entities/user';
import { PasswordService } from '../../auth/service/PasswordService';
import { UserService } from '../service/UserService';
import { BaseRepository } from '../../../core/baseRepository';
import {PaginateOptions} from "../../../domain/Entities/infra";
import { APPLICATION_MODELS } from '../../../core/models';


export class UserRepository extends BaseRepository {
  private userService = new UserService();
  private passwordService = new PasswordService();

  constructor() {
    super();
  }

  async createUser(body: CreateUserDTO): Promise<User> {
    try {
      const salt = this.passwordService.generateSalt();
      const hashedPassword = this.passwordService.createHash(body.password, salt);
      // TODO fix user id
      const user: User = {
        id: 1,
        email: body.email,
        hashedPassword: hashedPassword,
        salt: salt
      };
      await this.userService.saveUserToJSONDatabase(user);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers(options: PaginateOptions, query?: any) {
    try {
      const paginateOptions: PaginateOptions = {
        offset: options.offset,
        limit: options.limit
      };

      const data = await this.paginate(APPLICATION_MODELS.USER, paginateOptions);
      console.log(`data: `, data);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(userId: number) {
    try {
      return await this.userService.findUserById(userId);
    } catch (err) {
      throw err;
    }
  }
}
