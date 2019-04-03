import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CarinventoryService {
  serverUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  createManufacturer(manufacturer) {
    return this.http.post<any>(this.serverUrl + 'api/createManufacturer', manufacturer)
    .pipe(
      catchError(this.handleError)
    );
  }
  createModel(model) {
    return this.http.post<any>(this.serverUrl + 'api/createModel', model)
    .pipe(
      catchError(this.handleError)
    );
  }

  getManufacturer() {
    return this.http.get<any>(this.serverUrl + 'api/getManufacturer').pipe(
      catchError(this.handleError)
    );
  }

  getInventoryList() {
    return this.http.get<any>(this.serverUrl + 'api/getInventoryList').pipe(
      catchError(this.handleError)
    );
  }
  deleteModel(id: number) {
    return this.http.delete(this.serverUrl + 'api/deleteModel/' + id).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }
}
