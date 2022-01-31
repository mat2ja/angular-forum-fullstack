import { UserPostsPipe } from './user/user-posts.pipe';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { AuthService } from './auth/auth.service';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { RouterModule } from '@angular/router';
import { PostItemComponent } from './post/post-item/post-item.component';
import { PostsComponent } from './post/posts/posts.component';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostNewComponent } from './post/post-new/post-new.component';
import AuthGuard from './auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    PostItemComponent,
    PostNewComponent,
    LoginComponent,
    RegisterComponent,
    UserProfileComponent,
    UserPostsPipe,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
