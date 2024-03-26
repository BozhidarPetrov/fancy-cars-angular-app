import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  canActivate(): boolean {
    const id = localStorage.getItem('id');

    if (id !== null) {
      return true;
    } else {
      this.router.navigate(['/user/login']);
      return false;
    }
  }
}
