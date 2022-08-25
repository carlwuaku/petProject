import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  user:User;
  constructor(private authService:AuthService) { 
    this.user  = this.authService.getUser()
  }

  ngOnInit(): void {
  }

  logout():void{
    this.authService.logout()
  }

}
