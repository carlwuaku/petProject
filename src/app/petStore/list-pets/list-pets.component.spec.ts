import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ListPetsComponent } from './list-pets.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {  MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import {  expectText, findEl, setFieldValue, setUpLocalStorage } from 'src/app/testHelpers/spec-helper';
import { RouterTestingModule } from '@angular/router/testing';
import routes from 'src/app/app-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import constants from 'src/app/constants';
import { DatabaseService } from 'src/app/database.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import { MatOption } from '@angular/material/core/option';

describe('ListPetsComponent', () => {
  let component: ListPetsComponent;
  let fixture: ComponentFixture<ListPetsComponent>;
  let location: Location;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPetsComponent ],
      providers: [DatabaseService],
      imports:[ReactiveFormsModule, BrowserAnimationsModule,
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
    fixture = TestBed.createComponent(ListPetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //test the mat-select status element
  it('should test the change detection of status checking', fakeAsync(() => {
    const options: MatOption[] = component.matSelect.options.toArray();
  expect(options.length).toBe(3);
  expect(options[0].viewValue).toBe('available');
  expect(options[1].viewValue).toBe('pending');
  expect(options[2].viewValue).toBe('sold');

  
  const spy=  spyOn(component, 'filterByStatus').and.callThrough();
  //on init, it should be called once
  component.ngOnInit();
  fixture.detectChanges();
  expect(spy).toHaveBeenCalledTimes(1);
  //change the status
  options[1]._selectViaInteraction();
  fixture.detectChanges();
  //spy method has to be called again
  expect(spy).toHaveBeenCalledTimes(2);
  //the second option should be selected
  expect(options[1].selected).toBeTrue();

   
    
  }))


});
