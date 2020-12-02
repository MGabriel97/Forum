import { Thread } from './../shared/models/thread';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse  } from '@angular/common/http';
import { Observable} from 'rxjs';
import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(
    private http: HttpClient) { }


    getThreads(): Observable<Thread[]> {
      return this.http.get<Thread[]>('http://localhost:8080/thread/all/').pipe(retry(1), catchError(this.handleError));
    }

    addThread(thread: Thread): Observable<Thread>
    {
      return this.http.post<Thread>('http://localhost:8080/thread/addid',thread).pipe(retry(1), catchError(this.handleError));;
    }

    getAllThreadsBySubForum(): Observable<Thread[]> {
      return this.http.get<Thread[]>('http://localhost:8080/thread/findbysubforum/'+localStorage.getItem("subforum")).pipe(retry(1), catchError(this.handleError));
    }


    getThreadId(id: number): Observable<Thread>
    {
      const url = `http://localhost:8080/thread/findbyid/${id}`;
      return this.http.get<Thread>(url).pipe(retry(1), catchError(this.handleError));;
    }


    handleError(error: HttpErrorResponse) {
      let errorMessage = 'Unknown error!';
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      window.alert(errorMessage);
      return throwError(errorMessage);
    }
}
