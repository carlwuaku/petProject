import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import constants from '../constants';
import { DatabaseService } from '../database.service';
import { AuthData } from './authData.model';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user!: User;
  isLoggedIn:boolean = false;
 
  /**
   * a subject that notifies others that authentication has 
   * occured
   */
  // authChanged:Subject<boolean> = new Subject();
  loading:Subject<boolean> = new Subject();
  constructor(private router:Router, private dbService:DatabaseService, 
    private snackbar:MatSnackBar) {
    const user = localStorage.getItem(constants.USER_LOCALSTORAGE);
    if (user !== null){
      this.user = JSON.parse(localStorage.getItem(constants.USER_LOCALSTORAGE)!);
    this.isLoggedIn = true;
    }
    else{
      //do nothing.
      
    }
   }

   checkLoggedIn():boolean{
     return this.isLoggedIn
   }


  login(authData:AuthData){
    try {
      this.loading.next(true)
      this.dbService.getData(`user/login?username=${authData.username}&password=${authData.password}`)
    .subscribe(data =>{
      this.user = {
        
         username:authData.username
      }
      localStorage.setItem(constants.USER_LOCALSTORAGE, JSON.stringify(this.user));
      this.loading.next(false);
      this.snackbar.open('Logged in successfully!', '', {
        duration: 3000
      });
      this.router.navigate(['/']);
    })
    } catch (error) {
      console.log(error)
    }
    finally{
      this.loading.next(false);

    }
    
    
   
  }

  logout(){
    try {
      this.dbService.getData(`user/logout`)
    .subscribe(data =>{
      localStorage.clear();
      this.snackbar.open('Logged out successfully!', '', {
        duration: 3000
      });
      this.router.navigate(['/login'])
    })
    } catch (error) {
      console.log(error)
    }
    
   
  }

  getUser():User{
    return this.user
    
  }
}
