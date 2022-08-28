import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expectText } from '../testHelpers/spec-helper';

import { PageNotFoundComponent } from './page-not-found.component';

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageNotFoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render message for page not found', ()=>{
    const fixture = TestBed.createComponent(PageNotFoundComponent);
    fixture.detectChanges();
    expectText(fixture, 'pagenotfoundheader','Oops! Page not found!')
    
  
  })
});
