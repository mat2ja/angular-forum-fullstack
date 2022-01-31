import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, Observable, map } from 'rxjs';
import { DataService } from './../data.service';
import { UserLogin, User, UserData } from './auth.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User | null;
  private token: string | null;

  users: User[] = [];
  usersSubject: BehaviorSubject<User[]> = new BehaviorSubject([] as User[]);
  errorEmitter: Subject<string | null> = new Subject<string | null>();
  authChange: Subject<boolean> = new Subject<boolean>();

  dbUrl = `${environment.API_URL}/api`;

  constructor(
    private dataService: DataService,
    private router: Router,
    private http: HttpClient
  ) {
    this.init();
  }

  init() {
    this.dataService.getUsers().subscribe((res: any) => {
      this.users = res;
      this.usersSubject.next(this.users);
    });
  }

  login(credentials: UserLogin) {
    this.dataService.verifyUser(credentials).subscribe(
      (res: any) => {
        this.user = res.user as User;

        this.storeUserToLocalStorage(this.user);
        this.storeUserToken(res.token as string);
        this.authChange.next(true);
        this.errorEmitter.next(null);
        this.router.navigate(['']);
      },
      (err) => {
        this.user = null;
        this.removeStoredUserToken();
        this.removeStoredUserToken();
        const errorMsg = err?.error?.error || 'Invalid credentials';
        this.errorEmitter.next(errorMsg);
      }
    );
  }

  logout() {
    this.user = null;
    this.removeStoredUserToken();
    this.removeStoredUserToken();
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  register(credentials: UserData) {
    this.dataService.addUser(credentials).subscribe((res: any) => {
      this.user = res.user as User;
      this.users.push(this.user);

      this.storeUserToken(res.token as string);
      this.storeUserToLocalStorage(this.user);
      this.usersSubject.next(this.users);
      this.authChange.next(true);
      this.router.navigate(['']);
    });
  }

  storeUserToken(token: string) {
    this.token = token;
    localStorage.setItem('token', this.token);
  }

  removeStoredUserToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  storeUserToLocalStorage(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  removeStoredUser() {
    localStorage.removeItem('user');
  }

  isAuthenticated() {
    return this.user != null;
  }

  isCurrentUser(userId: string) {
    return this.isAuthenticated() && this.user?._id === userId;
  }

  getUser() {
    if (this.user) {
      return { ...this.user };
    } else {
      const userJSON = localStorage.getItem('user') || '{}';
      return JSON.parse(userJSON) || null;
    }
  }

  getToken() {
    if (!this.token) {
      this.token = localStorage.getItem('token') ?? null;
    }
    return this.token;
  }

  whoAmI() {
    if (this.getToken()) {
      const headers = {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${localStorage.getItem('token')}`
        ),
      };
      return this.http.get(`${this.dbUrl}/users/me`, headers).pipe(
        map((res: any) => {
          console.log('ME :>> ', res);
          this.user = res as User;
          this.authChange.next(true);
          return { error: false, user: res };
        })
      );
    } else {
      return new Observable((observer) => {
        observer.next({ error: true });
      });
    }
  }
}
