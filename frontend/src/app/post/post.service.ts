import { AuthService } from './../auth/auth.service';
import { User } from './../auth/auth.model';
import { DataService } from './../data.service';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Post, PostBase } from './post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  user: User | null;
  posts: Post[] = [];
  postsSubject: BehaviorSubject<Post[]> = new BehaviorSubject([] as Post[]);

  constructor(private dataService: DataService, private auth: AuthService) {
    this.init();
  }

  init() {
    this.dataService.getPosts().subscribe((res: any) => {
      this.posts = res;
      this.postsSubject.next(this.posts);
    });
  }

  getPosts() {
    return this.postsSubject;
  }

  getMyPosts() {
    this.dataService.getMyPosts().subscribe((res: any) => {
      this.posts = res;
      this.postsSubject.next(this.posts);
    });
  }

  addPost(post: PostBase, user: User) {
    this.dataService.addPost(post).subscribe((res: any) => {
      const newPost = {
        ...res,
        user: { username: user.username },
      };

      this.posts = [...this.posts, newPost];
      this.postsSubject.next(this.posts);
    });
  }

  editPost(postId: string, updatedPost: Partial<PostBase>) {
    this.dataService.editPost(postId, updatedPost).subscribe((res: any) => {
      if (res.modifiedCount === 1) {
        const oldPostIdx = this.getPostIndexById(postId);
        if (oldPostIdx !== -1) {
          this.posts[oldPostIdx] = {
            ...this.posts[oldPostIdx],
            ...updatedPost,
          };
          this.postsSubject.next(this.posts);
        }
      }
    });
  }

  deletePost(id: string) {
    this.dataService.deletePost(id).subscribe((res: any) => {
      if (res!.deletedCount === 1) {
        this.posts = this.posts.filter((post) => post._id !== id);
        this.postsSubject.next(this.posts);
      }
    });
  }

  getPostById(id: string) {
    return this.posts.find((post) => post._id === id);
  }

  getPostIndexById(id: string) {
    return this.posts.findIndex((post) => post._id === id);
  }
}
