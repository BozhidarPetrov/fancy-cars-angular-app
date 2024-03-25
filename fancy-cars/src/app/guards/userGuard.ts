import { Injectable, OnInit } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { UserService } from '../user/user.service';


@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
   

  constructor(private router: Router, private userService: UserService) {
 
  }

  canActivate(): boolean {

  const  id = localStorage.getItem('id');

    if (id === null) {
      return true; // Allow access if the user is authenticated
    } else {
        
      this.router.navigate(['/404']); // Redirect to login if not authenticated
      return false; // Prevent access to the route
    }
  }
}
