import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import constants from 'src/app/constants';
import { expectText, findEl, setUpLocalStorage } from 'src/app/testHelpers/spec-helper';

import { ViewPetDetailsComponent } from './view-pet-details.component';

describe('ViewPetDetailsComponent', () => {
  let component: ViewPetDetailsComponent;
  let fixture: ComponentFixture<ViewPetDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPetDetailsComponent ],
      imports:[],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
     { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
    setUpLocalStorage();
    localStorage.setItem(constants.USER_LOCALSTORAGE, '');
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * check to make sure the name and status are rendered properly.
   * also, the nophotos and notags are expected to be shown since they will be empty
   */
  it('should render name and status, nophotos and notags', ()=>{
    component.data = {
      name:"pet 0",
      photoUrls:[],
      status: "available"
    }

    fixture.detectChanges();
    expect(findEl(fixture,'name')).toBeTruthy();
    expect(findEl(fixture, 'status')).toBeTruthy();
    expectText(fixture, 'name','Name: pet 0');
    expectText(fixture, 'status','available');
    expect(findEl(fixture, 'noPhotosDiv')).toBeTruthy();
    expect(findEl(fixture, 'noTagsDiv')).toBeTruthy();
    
  })

  /**
   * check to make sure the name and status are rendered properly.
   * also, the photos and tags are expected to show since values are being 
   * provided for them
   */
   it('should render name and status, hasphotos and hastags', ()=>{
    component.data = {
      name:"pet 1",
      photoUrls:['some picture'],
      status: "pending",
      tags: ['tag1','tag2']
    }

    fixture.detectChanges();
    expect(findEl(fixture,'name')).toBeTruthy();
    expectText(fixture, 'name','Name: pet 1');
    expect(findEl(fixture, 'status')).toBeTruthy();
    expectText(fixture, 'status','pending');
    expect(findEl(fixture, 'hasPhotosDiv')).toBeTruthy();
    expect(findEl(fixture, 'hasTagsDiv')).toBeTruthy();
    
  })

  //
});
