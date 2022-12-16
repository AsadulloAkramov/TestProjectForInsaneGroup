import * as fs from "fs";
import * as process from "process";
import {User} from "../../domain/Entities/user";
import {func} from "joi";
import {Post} from "../../domain/Entities/post";
import * as console from "console";



(async function () {
  try {
      // read and insert users
      readMockUsersAndInsertToDB();
      // read and insert posts
      readMockPostsAndInsertToDB();

      console.log('All mock data inserted to database successfully');
  }
  catch (err) {
      console.log(err);
  }
})();

function readMockUsersAndInsertToDB() {
    const mockUsersFilePath: string = `${__dirname}/users/mockUsers.json`;
    const usersCollectionPathInJsonDB: string = process.cwd() + `/src/JSONDatabase/users.json`;

    const allMockUsersAsJSON = fs.readFileSync(mockUsersFilePath);
    const users: User[] = JSON.parse(allMockUsersAsJSON.toString());
    fs.writeFileSync(usersCollectionPathInJsonDB, JSON.stringify(users));
}

function readMockPostsAndInsertToDB() {
    const mockPostsFilePath: string = `${__dirname}/posts/mockPosts.json`;
    const postsCollectionPathInJsonDB: string = process.cwd() + `/src/JSONDatabase/posts.json`;

    const allMockPostsAsJSON = fs.readFileSync(mockPostsFilePath);
    const posts: Post[] = JSON.parse(allMockPostsAsJSON.toString());
    fs.writeFileSync(postsCollectionPathInJsonDB, JSON.stringify(posts));
}