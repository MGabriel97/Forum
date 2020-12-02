import { User } from '../../shared/models/user';
import { Component, OnInit } from '@angular/core';
import { Type} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpEventType,HttpErrorResponse } from '@angular/common/http';
import { NgForm }   from '@angular/forms';
import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Component({
  selector: 'app-modalconfirmedit',
  templateUrl: './modalconfirm.component.html',
})
export class ModalconfirmComponentEdit implements OnInit {
  constructor(public modal: NgbActiveModal,private http: HttpClient) {}
  onSubmit(form: NgForm): void{
    let validate:User;
    validate=form.value;
   if(validate.email!="" && validate.location!="" )
   {
    this.http.post<any>('http://localhost:8080/user/update/'+localStorage.getItem("user"),validate).pipe(retry(1), catchError(this.handleError)).subscribe((data: User)=>{
      window.top.location.reload();
    });
    }
    else
    {
      alert("Invalid data");
    }
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
