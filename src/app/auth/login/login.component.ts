import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import constants from 'src/app/constants';
import { AuthService } from '../auth.service';
import { AuthData } from '../authData.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  is_submitted:boolean = false;
  message: string = "";
  username: string = "";
  password: string = "";
  error:boolean = false;
  error_message:string = "";
  user: any;
  loading:boolean = false;
  appTitle:string = constants.APP_TITLE;
  constructor(private fb:FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required]
      }
    )
    this.authService.loading.subscribe(state => {
      this.loading = state;
    })
  }
  
  login():void{
    if(!this.form.valid){
      this.error = true;
      this.error_message = "Please fill the forms appropriately";
      return;
    }
    const loginData:AuthData = {
      username: this.form.get('username')?.value,
      password: this.form.get('password')?.value
    }
    this.authService.login(loginData);
  }

}
