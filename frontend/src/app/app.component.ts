import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'forum-v2';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.auth.whoAmI().subscribe(
      (res: any) => {
        if (res.error) {
          this.router.navigate(['login']);
        }
      },
      (err) => {
        this.router.navigate(['login']);
      }
    );
  }
}
