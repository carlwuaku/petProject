import { TestBed } from '@angular/core/testing';

import { DatabaseService } from './database.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Data } from '@angular/router';
import { environment } from 'src/environments/environment';
describe('DatabaseService', () => {
  let service: DatabaseService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(DatabaseService);
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('can test HttpClient.get', () => {
    const testData: Data = {name: 'Test Data'};
  
    // Make an HTTP GET request
    service.getData('data')
      .subscribe(data =>
        // When observable resolves, result should match test data
        expect(data).toEqual(testData)
      );
  
    // expect that the url has the baseurl in environment prepended
    const req = httpTestingController.expectOne(`${environment.baseUrl}data`);
  
    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');
  
   
    req.flush(testData);
  });


  it('can test HttpClient.post', () => {
    const testData: Data = {name: 'Test Data'};
  
    // Make an HTTP GET request
    service.postData('data', testData)
      .subscribe(data =>
        // When request resolves, result should match test data
        expect(data).toEqual(testData)
      );
  
    // expect that the url has the baseurl in environment prepended
    const req = httpTestingController.expectOne(`${environment.baseUrl}data`);
  
    // Assert that the request is a POST.
    expect(req.request.method).toEqual('POST');
  
    req.flush(testData);
  });
});
