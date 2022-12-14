import * as crypto from 'crypto';

export class PasswordService {
  private defaultSaltLength: number = 10;
  async checkPassword(hash: string, salt: string, password: string): Promise<boolean> {
    return hash == this.generateMD5(password + salt);
  }

  generateSalt(length: number = this.defaultSaltLength): string {
    return crypto.randomBytes(length).toString('hex');
  }

  createHash(password: string, salt: string): string {
    return this.generateMD5(password + salt);
  }

  private generateMD5(input: string): string {
    return crypto.createHash('md5').update(input).digest('hex');
  }
}
