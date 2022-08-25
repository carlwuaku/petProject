import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from "../environments/environment";
import { Observable,  retry, throwError, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }

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

getData(path:string):Observable<any>{
  const headers = new HttpHeaders({ 'api_key': 'special-key'
  });

  return this.http.get(environment.baseUrl+path, { headers: headers }).pipe(
    retry(1), catchError(this.handleError)
  );
}

postData(path:string, data:any):Observable<any>{
  const headers = new HttpHeaders({ 'Content-Type': 'application/json'
  , 'api_key': 'special-key'});
    //headers.append('Userid', user.id);
    //headers.append('Token', user.token);
    //headers.append('Type', '_admin');
    return this.http.post(environment.baseUrl+path,
       data, { headers: headers }).pipe(
      retry(1), catchError(this.handleError)
    );
}

}
