import * as jwt from 'jsonwebtoken';
import * as randomToken from 'rand-token';
import { JWTClaims, JWTToken, RefreshToken } from '../../../domain/Entities/user';

export class AuthService {
  async signJWT(props: JWTClaims): Promise<JWTToken> {
    const jwtSecret: string = process.env.JWT_SECRET;
    const jwtLifeTime: string = process.env.JWT_LIFETIME;

    return jwt.sign(props, jwtSecret, {
      expiresIn: jwtLifeTime
    });
  }

  async createRefreshToken(): Promise<RefreshToken> {
    try {
      return randomToken.uid(256) as RefreshToken;
    } catch (err) {
      throw err;
    }
  }
}
