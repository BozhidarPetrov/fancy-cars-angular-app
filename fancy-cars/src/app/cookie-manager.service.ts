import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CookieManagerService {
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this.isLoggedInSubject.asObservable();



  constructor(private cookieService: CookieService) {
   }

  getCookiesState(){
   const token = this.cookieService.get('authToken')
   return token ? this.isLoggedInSubject.next(true) : this.isLoggedInSubject.next(false)

  }
  setCookiesState(token: string){
     this.cookieService.set('authToken', token);
     this.isLoggedInSubject.next(true)
  }
  removeCookiesState(){
     this.cookieService.delete('authToken');
     this.isLoggedInSubject.next(false)
  }
}
