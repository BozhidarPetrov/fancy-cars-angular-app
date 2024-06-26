import { Component, OnInit } from '@angular/core';
import { CookieManagerService } from './cookie-manager.service';
import { UserService } from './user/user.service';
import { RegisteredUser } from './types/registeredUser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  loggedUser: RegisteredUser | undefined;
  id: string | null;

  constructor(
    private cookieManager: CookieManagerService,
    private userService: UserService
  ) {
    this.id = '';
  }

  ngOnInit(): void {
    this.id = localStorage.getItem('id');

    if (this.id !== null) {
      this.userService.getUser(this.id).subscribe({
        next: (user) => {
          this.userService.user = user;
          this.userService.user$$.next(user);
          this.cookieManager.isLoggedInSubject.next(true);
        },
        error: (err) => {
          console.error(`Error: ${err.message}`);
        },
      });
    }
  }
}
