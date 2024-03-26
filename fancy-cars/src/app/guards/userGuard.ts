import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  canActivate(): boolean {
    const id = localStorage.getItem('id');

    if (id === null) {
      return true;
    } else {
      this.router.navigate(['/404']);
      return false;
    }
  }
}
