import { SubForum } from '../../shared/models/subforum';
import { Component, OnInit,Inject,Input } from '@angular/core';
import { Type} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpEventType,HttpErrorResponse } from '@angular/common/http';
import { NgForm }   from '@angular/forms';
import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-modalconfirm',
  templateUrl: './modalconfirm.component.html',
})
export class ModalconfirmComponent implements OnInit {
  storedCategory:Array<String>= new Array<String>();
  storedFirst:String="";
  constructor(public modal: NgbActiveModal,private http: HttpClient,@Inject(DOCUMENT) private _document: Document ) {}
  onSubmit(form: NgForm): void{
    let validate:SubForum;
    validate=form.value;
   if(validate.category!="" && validate.description!="" && validate.subForumName!="")
   {
    this.http.post<SubForum>('http://localhost:8080/subforum/add',form.value).pipe(retry(1), catchError(this.handleError)).subscribe((data: SubForum)=>{
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
    this.storedCategory = JSON.parse(localStorage.getItem("categories"));
    this.storedFirst ="asd";
  }

}
