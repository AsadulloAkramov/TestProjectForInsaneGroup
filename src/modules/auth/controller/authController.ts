import { BaseController } from '../../../core/baseController';
import { Request, Response } from 'express';
import { AuthResponseDTO, LoginDTO } from '../dtos/AuthDTO';
import { AuthRepository } from '../repository/authRepository';
import { JWTClaims, User } from '../../../domain/Entities/user';
import { ICheckPasswordDTO } from '../dtos/PasswordDTO';
import AuthSchema from '../http/validation/auth';
import { Validate } from '../../../core/http/middlewares/ValidatorRequest';

export class AuthController extends BaseController {
  private authRepository = new AuthRepository();

  @Validate(AuthSchema.login)
  async login(req: Request, res: Response) {
    try {
      const body: LoginDTO = req.body;
      const userData: User = await this.authRepository.findUserByEmail(body.email);
      if (!userData) {
        this.notFound(res, 'User not found with that email');
      }
      const { hashedPassword, salt, ...user } = userData;
      const passwordOptions: ICheckPasswordDTO = {
        hash: hashedPassword,
        salt: salt,
        password: body.password
      };

      const isValidPassword = await this.authRepository.checkPassword(passwordOptions);
      if (!isValidPassword) {
        this.clientError(res, 'Email or password is incorrect');
      }

      const jwtClaimProps: JWTClaims = {
        userId: user.id,
        email: user.email
      };
      const tokens = await this.authRepository.getTokens(jwtClaimProps);
      // Save tokens to redis

      this.ok(res, {
        user,
        tokens
      } as AuthResponseDTO);
    } catch (err) {
      this.fail(res, err.message);
    }
  }
}
