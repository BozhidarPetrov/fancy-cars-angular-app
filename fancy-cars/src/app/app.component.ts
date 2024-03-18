import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CookieManagerService } from './cookie-manager.service';
import { Subscription } from 'rxjs';
import { UserService } from './user/user.service';
import { RegisteredUser } from './types/registeredUser';
import { OnSameUrlNavigation } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy{
 isLoggedIn:boolean | undefined;
 userInfo:RegisteredUser | undefined;
 id: string | null;
 private subscription: Subscription | undefined;

  constructor(private cookieManager: CookieManagerService, private userService: UserService ){
    this.id = '';
  }  
  
  ngOnInit(): void {
    
    this.id = localStorage.getItem('id');
    console.log(this.id);
    

    console.log('before init', this.isLoggedIn);
   
    this.subscription = this.cookieManager.isLoggedIn$.subscribe(boolean=> {this.isLoggedIn = boolean});
      // this.subscription = this.userService.user$.subscribe(user=> {this.userInfo = user, this.id = user?._id})

    console.log('after init', this.isLoggedIn);

  }

  
ngOnDestroy(): void {
 this.subscription?.unsubscribe()
}


}
