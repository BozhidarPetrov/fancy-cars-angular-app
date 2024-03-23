import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { emailValidator } from '../user-validators';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CookieManagerService } from '../../cookie-manager.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  emailValidatorFn = emailValidator;

  constructor(
    private userService: UserService,
    private router: Router,
    private cookieService: CookieService,
    private cookieManager: CookieManagerService
  ) {}

  onLoginSubmitHandler(form: NgForm): void {
    const email = form.value.email.trim();
    const password = form.value.password.trim();

    if (form.invalid || !this.emailValidatorFn(email)) {
      return;
    }

    this.userService.login(email, password).subscribe((user) => {
      const token = this.userService.user?.accessToken;
      if (token) {
        this.cookieService.set('authToken', token);
        localStorage.setItem('id', user?._id);
        this.cookieManager.setCookiesState(token);
      }
      this.router.navigate(['/']);
    });
  }
}
