import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../auth/auth.service';
import constants from '../constants';
import { MaterialModule } from '../material/material.module';
import { expectText, findEl, setUpLocalStorage } from '../testHelpers/spec-helper';
import routes from '../app-routing.module';
import {Router} from "@angular/router";
import {Location} from "@angular/common";

import { NavigationComponent } from './navigation.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let router: Router;
  let location: Location;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationComponent ],
      providers:[AuthService],
        imports:[ ReactiveFormsModule,
          HttpClientTestingModule,RouterTestingModule.withRoutes(routes), MatSnackBarModule, MaterialModule]
    })
    .compileComponents();
    setUpLocalStorage();
    localStorage.setItem(constants.USER_LOCALSTORAGE, JSON.stringify({username: 'carl'}));
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    router.initialNavigation(); 
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display relevant fields', ()=>{

    expect(findEl(fixture, 'navUsername')).toBeTruthy()
    expect(findEl(fixture, 'navLogoutBtn')).toBeTruthy()
  })

  it('should display username', () => {
    expectText(fixture, 'navUsername','carl')
  });


  it('should call logout on logoutbtn click ', fakeAsync(() => {
    spyOn(component, 'logout')

    findEl(fixture, 'navLogoutBtn').triggerEventHandler('click',{});
    //must callcomponent.logout()
    expect(component.logout).toHaveBeenCalled();
    
  }))

});
