import { Component, OnInit,Inject } from '@angular/core';
import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient, HttpEventType,HttpErrorResponse,HttpHeaders  } from '@angular/common/http';
import { NgForm }   from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { User } from './../shared/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  incorrectCredentials:any="";
  constructor(
    private http: HttpClient,private router: Router,@Inject(DOCUMENT) private _document: Document) { }
  onSubmit(form: NgForm): void{
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    this.http.post('http://localhost:8080/user/login',form.value,{responseType: 'text'}).pipe(retry(1), catchError(this.handleError)).subscribe((data)=>{
      if(data=="Incorrect username and paasword")
      {
        this.incorrectCredentials="Datele de autentificare sunt incorecte";
    
      }
      else
      {
        this.http.get('http://localhost:8080/user/findbyid/'+data).pipe(retry(1), catchError(this.handleError)).subscribe((data:User)=>{
      localStorage.setItem("role",data.role);
    });
        this.incorrectCredentials="";
        localStorage.setItem("user",data);
        sessionStorage.setItem("auth","true") ;
        setTimeout(() => 
              {
                this._document.defaultView.location.reload();
              },
             250);   

        this.router.navigate(['/profile'] );


      }
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

  ngOnInit(): void {
  }

}
