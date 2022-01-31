import { Post } from './../post/post.model';
import { User } from './../auth/auth.model';
import { AuthService } from './../auth/auth.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userPosts',
  pure: true,
})
export class UserPostsPipe implements PipeTransform {
  constructor(private auth: AuthService) {}

  transform(posts: Post[]): Post[] {
    const { _id } = this.auth.getUser() as User;

    return posts.filter(({ userId }) => userId === _id);
  }
}
