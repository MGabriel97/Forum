import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse  } from '@angular/common/http';
import {Reply} from "../shared/models/Reply";
import { Observable} from 'rxjs';
import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReplyService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(
    private http: HttpClient) { }


    getReplys(): Observable<Reply[]> {
      return this.http.get<Reply[]>('http://localhost:8080/reply/all/').pipe(retry(1), catchError(this.handleError));
    }
    getReplyByUser(): Observable<Reply[]> {
      return this.http.get<Reply[]>('http://localhost:8080/reply/alluserreply/'+localStorage.getItem("user")).pipe(retry(1), catchError(this.handleError));
    }
    getReplyByPost(): Observable<Reply[]> {
      return this.http.get<Reply[]>('http://localhost:8080/reply/findbypost/'+localStorage.getItem("post")).pipe(retry(1), catchError(this.handleError));
    }

  
    addReply(reply: any): Observable<Reply>
    {
      return this.http.post<Reply>('http://localhost:8080/reply/addid',reply).pipe(retry(1), catchError(this.handleError));;
    }


    getReplyId(id: number): Observable<Reply>
    {
      const url = `http://localhost:8080/reply/findbyid/${id}`;
      return this.http.get<Reply>(url).pipe(retry(1), catchError(this.handleError));;
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
