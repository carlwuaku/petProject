import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPetComponent } from './add-pet.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {  MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { expectText, findEl, setFieldValue, setUpLocalStorage } from 'src/app/testHelpers/spec-helper';
import { RouterTestingModule } from '@angular/router/testing';
import routes from 'src/app/app-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import constants from 'src/app/constants';
import { DatabaseService } from 'src/app/database.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('AddPetComponent', () => {
  let component: AddPetComponent;
  let fixture: ComponentFixture<AddPetComponent>;

  const petName = "pet 1";
  const petStatus = "available";
  const petImage = "img1";
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPetComponent ],
      providers: [DatabaseService],
      imports:[ReactiveFormsModule,BrowserAnimationsModule,
        HttpClientTestingModule,RouterTestingModule.withRoutes(routes), MatSnackBarModule, MaterialModule]
    })
    .compileComponents();
    setUpLocalStorage();
    localStorage.setItem(constants.USER_LOCALSTORAGE, JSON.stringify({username: 'carl'}));
    
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const fillForm = () =>{
    setFieldValue(fixture,'addPetName', petName);
    setFieldValue(fixture, 'addPetStatus', petStatus)
    setFieldValue(fixture, 'addPetImage', petImage)
  }


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should submit form', ()=>{
    spyOn(component, 'submitForm');
    fillForm();

    findEl(fixture, 'addPetForm').triggerEventHandler('submit',{});
    expect(component.submitForm).toHaveBeenCalled();
    
  });

  it('should display relevant fields', ()=>{

    expect(findEl(fixture, 'addPetForm')).toBeTruthy()
    expect(findEl(fixture, 'addPetName')).toBeTruthy()
    expect(findEl(fixture, 'addPetStatus')).toBeTruthy()
    expect(findEl(fixture, 'addPetImage')).toBeTruthy()
    expect(findEl(fixture, 'addPetSubmitBtn')).toBeTruthy()
  })

  

  



  it('should display error on invalid form submit', ()=>{
    spyOn(component, 'submitForm');
    

    findEl(fixture, 'addPetForm').triggerEventHandler('submit',{});
    //must call component.submitForm()
    expect(component.submitForm).toHaveBeenCalled();
    component.error = true;
    const errorMessage = "Please fill the forms appropriately";
    component.error_message = errorMessage;
    fixture.detectChanges();
    //expect error_message to be Please fill the forms appropriately
    expectText(fixture, 'addPetError', errorMessage)
    
  });

});
