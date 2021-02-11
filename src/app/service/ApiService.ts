import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IFile } from '../dto/IFile';

@Injectable()
export class ApiService {
  private operationsUrl = 'http://localhost:8080/api/files';

  constructor(private http: HttpClient) {}

  getFiles(): Observable<IFile[]> {
    return this.http
      .get<IFile[]>(this.operationsUrl)
      .pipe(catchError(this.handleError<IFile[]>('getFiles', [])));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
