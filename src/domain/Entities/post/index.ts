type UserId = {
  id: number;
};

export interface Post {
  id: number;
  title: string;
  content: string;
  author: UserId;
}

export interface ICreatePostTask {
  title: string;
  content: string;

  author: UserId;
}
