import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType,HttpErrorResponse } from '@angular/common/http';
import { NgForm }   from '@angular/forms';
import { Observable} from 'rxjs';
import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {
  constructor(
    private http: HttpClient,private router: Router) { }
  onSubmit(form: NgForm): void{
    this.http.post<any>('http://localhost:8080/user/add',form.value).pipe(retry(1), catchError(this.handleError)).subscribe((data: any)=>{
      console.log(data);
      alert("Utilizator inregistrat");
      this.router.navigate(['/login'] );
    });
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