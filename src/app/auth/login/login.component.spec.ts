import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {  MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthData } from '../authData.model';
import { expectText, findEl, setFieldValue } from 'src/app/testHelpers/spec-helper';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
 

  const username = "carl";
  const password = "1234";
  

  const fillForm = () =>{
    setFieldValue(fixture,'username', username);
    setFieldValue(fixture, 'password', password)
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [AuthService],
      imports:[ReactiveFormsModule,
         HttpClientTestingModule,RouterTestingModule, MatSnackBarModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit form', ()=>{
    spyOn(component, 'login');
    fillForm();

    findEl(fixture, 'loginForm').triggerEventHandler('submit',{});
    //must call component.login()
    expect(component.login).toHaveBeenCalled();
    
  });

  it('should display relevant fields', ()=>{

    expect(findEl(fixture, 'loginForm')).toBeTruthy()
    expect(findEl(fixture, 'username')).toBeTruthy()
    expect(findEl(fixture, 'password')).toBeTruthy()
    expect(findEl(fixture, 'submitButton')).toBeTruthy()
    expect(findEl(fixture, 'appTitle')).toBeTruthy()
  })

  it('should display app title', () => {
    expectText(fixture, 'appTitle','The Pet Project')

  })

  it('should disable submit button if invalid', ()=>{
    
    expect(findEl(fixture, 'loginForm').nativeElement.querySelector('button').disabled).toBeTruthy()
    
  }) 


  it('should enable submit button if form filled', ()=>{
    fillForm();
    fixture.detectChanges()
    expect(findEl(fixture, 'loginForm').nativeElement.querySelector('button').disabled).toBeFalsy()
    
  }) 

  it('should display error on invalid form submit', ()=>{
    spyOn(component, 'login');
    

    findEl(fixture, 'loginForm').triggerEventHandler('submit',{});
    //must call component.login()
    expect(component.login).toHaveBeenCalled();
    component.error = true;
    const errorMessage =  "Please fill the forms appropriately";
    component.error_message = errorMessage;
    fixture.detectChanges();
    //expect error_message to be Please fill the forms appropriately
    expectText(fixture, 'loginError',errorMessage);
    
  });
});
