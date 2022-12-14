import { CreateUserDTO } from '../dtos/UserDTO';
import { User } from '../../../domain/Entities/user';
import { PasswordService } from '../../auth/service/PasswordService';
import { UserService } from '../service/UserService';

export class UserRepository {
  private userService = new UserService();
  private passwordService = new PasswordService();
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
    } catch (error) {}
  }
}
