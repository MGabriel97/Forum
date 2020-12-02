import { SubForum } from '../../shared/models/subforum';
import { Component, OnInit } from '@angular/core';
import { Type} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpEventType,HttpErrorResponse } from '@angular/common/http';
import { NgForm }   from '@angular/forms';
import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Component({
  selector: 'app-modalconfirmsubforum',
  templateUrl: './modalconfirm.component.html',
})
export class ModalconfirmComponentSubForum implements OnInit {
  constructor(public modal: NgbActiveModal,private http: HttpClient) {}
  onSubmit(form: NgForm): void{
    let validate:SubForum;
    validate=form.value;
    validate.category=localStorage.getItem("category");
   if(validate.category!="" && validate.description!="" && validate.subForumName!="")
   {
    this.http.post<SubForum>('http://localhost:8080/subforum/add',validate).pipe(retry(1), catchError(this.handleError)).subscribe((data: SubForum)=>{
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
