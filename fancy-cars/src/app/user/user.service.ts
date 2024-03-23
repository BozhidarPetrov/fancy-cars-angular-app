import { Injectable, OnDestroy } from '@angular/core';
import { User } from '../types/User';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { RegisteredUser } from '../types/registeredUser';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy{

   user$$ = new BehaviorSubject<RegisteredUser | undefined>(undefined);

  user$ = this.user$$.asObservable();

  user: RegisteredUser | undefined;

  get isLogged(): boolean {
    return !!this.user;
  }

  subscription: Subscription;

  constructor(private http: HttpClient, private cookieService: CookieService) { 
    this.subscription = this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  logout() {    

    this.cookieService.delete('authToken')
    localStorage.removeItem('id');

    return this.http
      .get<RegisteredUser>('/api/users/logout', {})
      .pipe(tap(() => this.user$$.next(undefined)));
  }

  login(email: string, password: string) {
    return this.http
      .post<RegisteredUser>('http://localhost:3030/users/login', { email, password })
      .pipe(tap((user) => this.user$$.next(user)));
  }



  
  register(
    username: string,
    email: string,
    password: string,
    rePassword: string,
  ) {
    return this.http
      .post<RegisteredUser>('http://localhost:3030/users/register', {
        username,
        email,
        password,
        rePassword,
      }).pipe(tap((user) => this.user$$.next(user)));

      
  }

  getUser(id:string | null){
    return this.http.post<RegisteredUser>(`http://localhost:3030/users/profile`, {
      id,
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
