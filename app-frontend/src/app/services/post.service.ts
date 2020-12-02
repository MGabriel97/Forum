import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse  } from '@angular/common/http';
import {Post} from "../shared/models/post";
import { Observable} from 'rxjs';
import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(
    private http: HttpClient) { }


    getPosts(): Observable<Post[]> {
      return this.http.get<Post[]>('http://localhost:8080/post/all/').pipe(retry(1), catchError(this.handleError));
    }

    getPostByUser(): Observable<Post[]> {
      return this.http.get<Post[]>('http://localhost:8080/post/alluserpost/'+localStorage.getItem("user")).pipe(retry(1), catchError(this.handleError));
    }
    
    addPost(post: Post): Observable<Post>
    {
      return this.http.post<Post>('http://localhost:8080/post/addid',post).pipe(retry(1), catchError(this.handleError));;
    }


    getPostId(): Observable<Post>
    {
      return this.http.get<Post>('http://localhost:8080/post/findbyid/'+localStorage.getItem("post")).pipe(retry(1), catchError(this.handleError));;
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
