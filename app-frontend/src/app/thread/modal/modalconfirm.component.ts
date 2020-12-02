import { SubForum } from '../../shared/models/subforum';
import { Component, OnInit } from '@angular/core';
import { Type} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpEventType,HttpErrorResponse } from '@angular/common/http';
import { NgForm }   from '@angular/forms';
import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { PostAdd } from 'src/app/shared/models/postadd';
import {ThreadAdd} from 'src/app/shared/models/threadadd';
@Component({
  selector: 'app-modalconfirm',
  templateUrl: './modalconfirm.component.html',
})
export class ModalconfirmComponentThread implements OnInit {
  constructor(public modal: NgbActiveModal,private http: HttpClient) {}
  onSubmit(form: NgForm): void{
    let validate:PostAdd;
    validate=form.value;
    validate.userPostId=localStorage.getItem("user");
    validate.threadName="asd";
   if(validate.namePost!="" && validate.dataPost!="" && validate.userPostId!="" && validate.threadName!="")
   {
    this.http.post<PostAdd>('http://localhost:8080/post/addid',validate).pipe(retry(1), catchError(this.handleError)).subscribe((data: PostAdd)=>{
      let thread:ThreadAdd=new ThreadAdd();
      thread.namePost=data.namePost;
      thread.nameThread=data.threadName;
      thread.namePostId=data.id.toString();
      thread.subForumId=localStorage.getItem("subforum");
      console.log(thread);
      this.http.post<ThreadAdd>('http://localhost:8080/thread/addid',thread).pipe(retry(1), catchError(this.handleError)).subscribe((dataThread: ThreadAdd)=>{
        window.top.location.reload();

    });

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
