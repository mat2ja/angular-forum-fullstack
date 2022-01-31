import { environment } from './../environments/environment.prod';
import { AuthService } from './auth/auth.service';
import { UserData, UserLogin } from './auth/auth.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostBase } from './post/post.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  dbUrl = `${environment.API_URL}/api`;

  constructor(private http: HttpClient) {}

  getPosts(includeUser = true) {
    return this.http.get(`${this.dbUrl}/posts?includeUser=${includeUser}`);
  }

  getMyPosts() {
    // TODO: headers to interceptor
    const headers = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${localStorage.getItem('token')}`
      ),
    };
    return this.http.get(`${this.dbUrl}/users/me/posts`, headers);
  }

  addPost(post: PostBase) {
    const headers = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${localStorage.getItem('token')}`
      ),
    };
    return this.http.post(`${this.dbUrl}/posts`, post, headers);
  }

  deletePost(id: string) {
    const headers = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${localStorage.getItem('token')}`
      ),
    };
    return this.http.delete(`${this.dbUrl}/posts/${id}`, headers);
  }

  editPost(postId: string, updatedPost: Partial<PostBase>) {
    const headers = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${localStorage.getItem('token')}`
      ),
    };
    return this.http.patch(
      `${this.dbUrl}/posts`,
      { ...updatedPost, postId },
      headers
    );
  }

  getUsers() {
    return this.http.get(`${this.dbUrl}/users`);
  }

  addUser(user: UserData) {
    return this.http.post(`${this.dbUrl}/register`, user);
  }

  verifyUser(credentials: UserLogin) {
    return this.http.post(`${this.dbUrl}/login`, credentials);
  }
}
