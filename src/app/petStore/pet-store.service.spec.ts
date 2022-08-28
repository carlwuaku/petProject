import { TestBed } from '@angular/core/testing';

import { PetStoreService } from './pet-store.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Data } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Pet } from './pet.model';

describe('PetStoreService', () => {
  let service: PetStoreService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PetStoreService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should expect 3 status', () =>{
    expect(service.statuses.length).toEqual(3)
  });

  it('should test filterPetsByStatus() function', () => {
    httpTestingController = TestBed.inject(HttpTestingController);

    const testData: Pet[] = [{name: 'Test Data', status:'available', photoUrls:[]}];
  
    service.filterPetsByStatus('available')
      .subscribe(data =>
        expect(data).toEqual(testData)
      );
  
    // expect that the url has the baseurl in environment prepended
    const req = httpTestingController.expectOne(`${environment.baseUrl}pet/findByStatus?status=available`);
  
    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');
  
   
    req.flush(testData);
    httpTestingController.verify();
  });

});
