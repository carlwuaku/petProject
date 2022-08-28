import { Injectable } from '@angular/core';
import { Pet } from './pet.model';
import { HttpClient, HttpHeaders,  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError,  retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PetStoreService {

  statuses:string[] = ["available", "pending", "sold"];
  pets:Pet[] = [];


  constructor(private http: HttpClient) {
  }
  
  
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

filterPetsByStatus(status:string):Observable<Pet[]>{
  const headers = new HttpHeaders({ 'api_key': 'special-key'
  });

  return this.http.get<Pet[]>(environment.baseUrl+`pet/findByStatus?status=${status}`, 
  { headers: headers }).pipe(
    retry(1), catchError(this.handleError)
  );
}

addPet(data:Pet):Observable<Pet>{
  const headers = new HttpHeaders({ 'Content-Type': 'application/json'
  , 'api_key': 'special-key'});
    //headers.append('Userid', user.id);
    //headers.append('Token', user.token);
    //headers.append('Type', '_admin');
    return this.http.post<Pet>(environment.baseUrl+`pet`,
       data, { headers: headers }).pipe(
      retry(1), catchError(this.handleError)
    );
}

}