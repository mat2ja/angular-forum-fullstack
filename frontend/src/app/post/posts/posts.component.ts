import { AuthService } from './../../auth/auth.service';
import { User } from './../../auth/auth.model';
import { PostBase } from './../post.model';
import { BehaviorSubject, Subscription } from 'rxjs';
import { PostService } from './../post.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {
  user: User | null;
  authenticated = false;
  posts: Post[];
  postsSubject: BehaviorSubject<Post[]>;
  postsSubscription: Subscription;
  authChangeSubscription: Subscription;

  addPost(post: PostBase) {
    if (this.user) {
      this.postService.addPost(post, this.user as User);
    }
  }

  deletePost(id: string) {
    this.postService.deletePost(id);
  }

  editPost({ postId, post }: { postId: string; post: Partial<PostBase> }) {
    this.postService.editPost(postId, post);
  }

  constructor(private postService: PostService, private auth: AuthService) {}

  ngOnInit() {
    this.user = this.auth.getUser();
    this.authenticated = this.auth.isAuthenticated();

    this.authChangeSubscription = this.auth.authChange.subscribe((res) => {
      this.authenticated = this.auth.isAuthenticated();
      this.user = this.auth.getUser();
    });

    this.postsSubject = this.postService.getPosts();
    this.postsSubscription = this.postsSubject.subscribe((res) => {
      this.posts = res;
    });
  }

  logout() {
    this.auth.logout();
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
    this.authChangeSubscription.unsubscribe();
  }
}
