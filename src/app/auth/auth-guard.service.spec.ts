
import { AuthGuardService } from './auth-guard.service';
import {Location} from "@angular/common";
import {TestBed, fakeAsync, tick} from '@angular/core/testing';
import {RouterTestingModule} from "@angular/router/testing";
import {Router} from "@angular/router";
import routes from '../app-routing.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {  MatSnackBarModule } from '@angular/material/snack-bar';
import constants from '../constants';

describe('AuthGuardService', () => {
  let service: AuthGuardService;
  let location: Location;
  let router: Router;
  let fixture;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes), HttpClientTestingModule, MatSnackBarModule]
    });
    service = TestBed.inject(AuthGuardService);

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    router.initialNavigation(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should navigate to login if not logged in',
  fakeAsync(()=>{
    router.navigate(['']).then(()=>{
      expect(location.path()).toBe('/login')
    })
    
  }));

  it('should navigate to "" if logged in and url is empty',
  fakeAsync(()=>{
    //use this to fake a login
    localStorage.setItem(constants.USER_LOCALSTORAGE,'anydata');
    router.navigate(['']).then(() => {
      expect(location.path()).toBe('/')
      localStorage.removeItem(constants.USER_LOCALSTORAGE)
    })
   
  }));

  


});
