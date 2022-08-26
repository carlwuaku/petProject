import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Data } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DatabaseService } from '../database.service';
import {  MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthService } from './auth.service';
import constants from '../constants';
import { environment } from 'src/environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule, HttpClientTestingModule, MatSnackBarModule],
      providers:[ DatabaseService]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test checkLoggedIn() if set', () => {
    //if localstorage user set, getLoggedIn() should return true
    localStorage.setItem(constants.USER_LOCALSTORAGE, 'anyitem');
    const isLoggedIn = service.checkLoggedIn();
    expect(isLoggedIn).toBeTrue();
    localStorage.removeItem(constants.USER_LOCALSTORAGE);
  });

  it('should test checkLoggedIn() if not set', () => {
    //if localstorage user set, getLoggedIn() should return true
    localStorage.removeItem(constants.USER_LOCALSTORAGE);
    const isLoggedIn = service.checkLoggedIn();
    expect(isLoggedIn).toBeFalse();
  });

  it('should test login() function', () => {
    httpTestingController = TestBed.inject(HttpTestingController);

    const testData: Data = {name: 'Test Data'};
  
    service.runLogin({password: '123', username:'any'})
      .subscribe(data =>
        // When observable resolves, result should match test data
        expect(data).toEqual(testData)
      );
  
    // expect that the url has the baseurl in environment prepended
    const req = httpTestingController.expectOne(`${environment.baseUrl}user/login?username=any&password=123`);
  
    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');
  
   
    req.flush(testData);
    httpTestingController.verify();
  });


  it('should test logout() function', () => {
    httpTestingController = TestBed.inject(HttpTestingController);

    const testData: Data = {name: 'Test Data'};
  
    service.runLogout()
      .subscribe(data =>
        // When observable resolves, result should match test data
        expect(data).toEqual(testData)
      );
  
    // expect that the url has the baseurl in environment prepended
    const req = httpTestingController.expectOne(`${environment.baseUrl}user/logout`);
  
    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');
  
   
    req.flush(testData);
    httpTestingController.verify();
  });
});
