import { User } from '../../../domain/Entities/user';

export interface LoginDTO {
  email: string;
  password: string;
}

export interface IToken {
  accessToken: string;

  refreshToken: string;
}

export interface AuthResponseDTO {
  user: User;
  tokens: IToken;
}
