import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
 
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, OnInit {
  isLoggedIn:boolean = false;
  constructor(private authService:AuthService, private router:Router) {

   }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.checkLogin(state.url);
  }

  checkLogin(url: string): boolean {
    
    if(this.authService.checkLoggedIn()){
      return true;
    }
    // this.authService.lastUrl = url;
    this.router.navigate(['/login']);
    return false;
  }
}
