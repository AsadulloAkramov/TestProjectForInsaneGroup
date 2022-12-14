import { User } from '../../../domain/Entities/user';
import fs from 'fs';

export class UserService {
  private userJsonDatabasePath: string = process.cwd() + '/src/JSONDatabase/users.json';

  async saveUserToJSONDatabase(user: User) {
    try {
      const allUser = this.readAllUserFromUsersJSON();
      // check file is empty or not
      if (allUser.length == 0) {
        fs.writeFileSync(this.userJsonDatabasePath, JSON.stringify([user]));
      } else {
        // append new user to users.json file
        const users = JSON.parse(allUser.toString());
        user.id = users.length + 1;
        users.push(user);
        fs.writeFileSync(this.userJsonDatabasePath, JSON.stringify(users));
      }
    } catch (err) {
      console.log(`User Service ---> saveUserToJSONDatabase Error: ${err.message}`);
      throw err;
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    try {
      const allUserAsJSON = this.readAllUserFromUsersJSON();
      // convert json data into array of users
      const users: User[] = await JSON.parse(allUserAsJSON.toString());
      return users.find((user) => user.email == email);
    } catch (err) {
      console.log(`User Service ---> findUserByEmail Error: ${err.message}`);
      throw err;
    }
  }

  readAllUserFromUsersJSON() {
    return fs.readFileSync(this.userJsonDatabasePath);
  }
}
