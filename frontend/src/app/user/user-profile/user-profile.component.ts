import { DataService } from './../../data.service';
import { User } from './../../auth/auth.model';
import { Subscription } from 'rxjs';
import { AuthService } from './../../auth/auth.service';
import { PostService } from './../../post/post.service';
import { Post, PostBase } from './../../post/post.model';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  user: User;
  userPosts: Post[];
  postsSubscription: Subscription;

  constructor(
    private postService: PostService,
    private dataService: DataService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.user = this.auth.getUser() as User;

    this.postsSubscription = this.dataService
      .getMyPosts()
      .subscribe((res: any) => {
        this.userPosts = res as Post[];
      });
  }

  deletePost(id: string) {
    this.postService.deletePost(id);
  }

  editPost({ postId, post }: { postId: string; post: Partial<PostBase> }) {
    this.postService.editPost(postId, post);
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }
}
