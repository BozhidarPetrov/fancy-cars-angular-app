import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CookieManagerService } from './cookie-manager.service';
import { Subscription } from 'rxjs';
import { UserService } from './user/user.service';
import { RegisteredUser } from './types/registeredUser';
import { OnSameUrlNavigation } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  loggedUser: RegisteredUser | undefined;
  id: string | null;
  //  private subscription: Subscription | undefined;

  constructor(
    private cookieManager: CookieManagerService,
    private userService: UserService
  ) {
    this.id = '';
  }

  ngOnInit(): void {
    this.id = localStorage.getItem('id');
    
    if(this.id !== null){
      this.userService.getUser(this.id).subscribe({
        next: (user) => {
          // this.loggedUser = user;
          this.userService.user = user;
          this.userService.user$$.next(user);
          this.cookieManager.isLoggedInSubject.next(true);
          // console.log(this.userService.user);
          
        },
        error: (err) => {
          console.error(`Error: ${err.message}`);
        },
      })
    }

  

  }

  // ngOnDestroy(): void {
  //  this.subscription?.unsubscribe()
  // }
}
