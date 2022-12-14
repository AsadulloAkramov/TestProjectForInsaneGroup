type PostId = {
  id: number;
};
export interface User {
  id: number;
  email: string;
  hashedPassword: string;
  salt: string;
  posts?: PostId[];
}

export interface JWTClaims {
  userId: number;
  email: string;
}

export type JWTToken = string;

export type RefreshToken = string;
