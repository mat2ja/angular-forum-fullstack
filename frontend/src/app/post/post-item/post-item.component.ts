import { User } from './../../auth/auth.model';
import { AuthService } from './../../auth/auth.service';
import { Subscription } from 'rxjs';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss'],
})
export class PostItemComponent implements OnInit, OnDestroy {
  @Input() post: Post;
  @Input() hasControls: boolean = false;
  @Input() editMode: boolean = false;
  @Input() user: Partial<User>;

  @Output() deletedPost = new EventEmitter();
  @Output() editedPost = new EventEmitter();

  editedComment: string = '';
  username: string = '';
  isCurrentUser = false;

  authChangeSubscription: Subscription;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.editedComment = this.post.comment;

    this.setIsCurrentUser();
    this.setUsername();

    this.authChangeSubscription = this.auth.authChange.subscribe((res) => {
      this.setIsCurrentUser();
      this.setUsername();
    });
  }

  setUsername() {
    this.username =
      this.user?.username || this.post?.user?.username || this.post.userId;
  }

  setIsCurrentUser() {
    this.isCurrentUser = this.auth.isCurrentUser(this.post.userId);
  }

  setEditMode(bool: boolean) {
    this.editMode = bool;
    if (this.editMode) {
      this.editedComment = this.post.comment;
    }
  }

  deletePost() {
    this.deletedPost.emit(this.post._id);
  }

  editPost() {
    this.post = { ...this.post, comment: this.editedComment };
    this.editedPost.emit({
      postId: this.post._id,
      post: { comment: this.editedComment },
    });
    this.editMode = false;
  }

  cancelEdit() {
    this.editMode = false;
  }

  formatTimestamp(ts: Date) {
    return new Date(ts).toLocaleString('de');
  }

  ngOnDestroy(): void {
    this.authChangeSubscription.unsubscribe();
  }
}
