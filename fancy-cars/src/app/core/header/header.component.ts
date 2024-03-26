import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';
import { CookieManagerService } from '../../cookie-manager.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { RegisteredUser } from '../../types/registeredUser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  username: string | undefined;
  hasUser: boolean | undefined;
  private subscription: Subscription | undefined;

  constructor(
    private userService: UserService,
    private cookieManager: CookieManagerService,
    private router: Router
  ) {}

  logout(): void {
    this.userService.logout();
    this.cookieManager.removeCookiesState();
    this.router.navigate(['/user/login']);
  }
  ngOnInit(): void {
    this.subscription = this.cookieManager.isLoggedIn$.subscribe((boolean) => {
      this.hasUser = boolean;
    });
    this.subscription = this.userService.user$.subscribe((user) => {
      this.username = user?.username;
    });
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
