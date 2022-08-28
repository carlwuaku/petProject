import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import constants from '../constants';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  user:User;
  title:string = "";
  constructor(private authService:AuthService) { 
    this.user  = this.authService.getUser();
    this.title = constants.APP_TITLE
  }

  ngOnInit(): void {
  }

  /**
   * call the authservice logout method which redirects user to login screen
   */
  logout():void{
    this.authService.logout()
  }

}
