import { UserData } from './../auth.model';
import { User, UserRegister } from '../auth.model';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string | null = null;

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')!.value === g.get('passwordConfirm')!.value
      ? null
      : { mismatch: true, message: 'Passwords do not match.' };
  }

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      passwordConfirm: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onRegister() {
    const passwordError = this.passwordMatchValidator(this.registerForm);

    if (passwordError && passwordError.mismatch) {
      this.errorMessage = passwordError.message;
      return;
    }

    const { username, password, name, email } = this.registerForm
      .value as UserRegister;
    const userData: UserData = {
      username,
      password,
      name,
      email,
    };
    this.errorMessage = null;
    this.auth.register(userData);
  }
}
