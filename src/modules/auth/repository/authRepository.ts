import { UserService } from '../../user/service/UserService';
import { ICheckPasswordDTO } from '../dtos/PasswordDTO';
import { PasswordService } from '../service/PasswordService';
import { JWTClaims, User } from '../../../domain/Entities/user';
import { IToken } from '../dtos/AuthDTO';
import { AuthService } from '../service/AuthService';

export class AuthRepository {
  private userService = new UserService();
  private passwordService = new PasswordService();

  private authService = new AuthService();
  async findUserByEmail(email: string) {
    try {
      return await this.userService.findUserByEmail(email);
    } catch (err) {
      throw err;
    }
  }

  async checkPassword(passwordOptions: ICheckPasswordDTO): Promise<boolean> {
    try {
      const { hash, salt, password } = passwordOptions;
      return await this.passwordService.checkPassword(hash, salt, password);
    } catch (err) {
      throw err;
    }
  }

  async getTokens(props: JWTClaims): Promise<IToken> {
    try {
      return {
        accessToken: await this.authService.signJWT(props),
        refreshToken: await this.authService.createRefreshToken()
      };
    } catch (err) {}
  }

  async decodedUser(token: string): Promise<JWTClaims> {
    try {
      return await this.authService.decodeJWT(token);
    } catch (err) {
      throw err;
    }
  }
}
