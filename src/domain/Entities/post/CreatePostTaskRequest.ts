import { Entity } from '../index';
import { ICreatePostTask } from './index';

type Author = {
  id: number;
};

export class CreatePostTaskRequest implements Entity<ICreatePostTask> {
  private readonly title: string;
  private readonly content: string;

  private readonly userId: number;
  constructor(title: string, content: string, userId: number) {
    this.title = title;
    this.content = content;
    this.userId = userId;
  }
  toObject(): ICreatePostTask {
    return {
      title: this.title,
      content: this.content,
      author: {
        id: this.userId
      }
    };
  }
}
