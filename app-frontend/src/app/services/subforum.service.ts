import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse  } from '@angular/common/http';
import {SubForum} from "../shared/models/subforum";
import { Observable} from 'rxjs';
import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SubforumService {

  private subForumUrl = 'api/heroes';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(
    private http: HttpClient) { }


    getSubForums(): Observable<SubForum[]> {
      return this.http.get<SubForum[]>('http://localhost:8080/subforum/all/').pipe(retry(1), catchError(this.handleError));
    }

    findByCategory(): Observable<SubForum[]> {
      return this.http.get<SubForum[]>('http://localhost:8080/subforum/findbycategory/'+localStorage.getItem("category")).pipe(retry(1), catchError(this.handleError));
    }

    getSubForumsOrder(): Observable<SubForum[]> {
      return this.http.get<SubForum[]>('http://localhost:8080/subforum/allorder/').pipe(retry(1), catchError(this.handleError));
    }

    addSubForum(subForum: SubForum): Observable<SubForum>
    {
      return this.http.post<SubForum>('http://localhost:8080/subforum/add',subForum).pipe(retry(1), catchError(this.handleError));;
    }


    getSubForumId(id: number): Observable<SubForum>
    {
      const url = `http://localhost:8080/subforum/findbyid/${id}`;
      return this.http.get<SubForum>(url).pipe(retry(1), catchError(this.handleError));;
    }


    handleError(error: HttpErrorResponse) {
      let errorMessage = 'Unknown error!';
      if (error.error instanceof ErrorEvent) {
        // Client-side errors
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server-side errors
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      window.alert(errorMessage);
      return throwError(errorMessage);
    }
}
