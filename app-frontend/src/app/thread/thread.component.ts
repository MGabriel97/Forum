import { ReplyService } from './../services/reply.service';
import { ThreadService } from './../services/thread.service';
import { Thread } from './../shared/models/thread';
import { Component, OnInit,Inject } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {Post} from "../shared/models/post";
import { User } from './../shared/models/user';
import { observable } from 'rxjs';
import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { LastPost } from '../shared/models/lastpost';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {
  Threads:Array<Thread>;
  image:any;
  count:Array<string>
  config:any;
  category:string;subforum:string;
  auth:string;
  titleSorted:number=0;

  constructor(private threadService: ThreadService,private replyService: ReplyService,
    private router: Router
    ,@Inject(DOCUMENT) private _document: Document,private http: HttpClient) { 
    this.image='../../assets/images/threadnew.png';
    this.Threads=new Array<Thread>();
    
      this.config = {
        itemsPerPage: 20,
        currentPage: 1,
        totalItems: this.Threads.length
      };
    }
    pageChanged(event){
      this.config.currentPage = event;
    }




  ngOnInit(): void {
    this.auth=sessionStorage.getItem("auth");

    this.category=localStorage.getItem("category");
    this.subforum=localStorage.getItem("subforumname");
    if( this.category.length>0)
    { 

    }
    this.threadService.getAllThreadsBySubForum().subscribe((data: Array<Thread>)=>{
      for(let row of data)
      {
        let number=row.id-1;
        this.http.get('http://localhost:8080/reply/findlastreply/'+number.toString()).pipe(retry(1), catchError(this.handleError)).subscribe((data:LastPost)=>{
          row.name=data.name;   
          row.dateTime=data.dateTime;       
        })
        this.http.get('http://localhost:8080/reply/count/'+number.toString(),{responseType: 'text'}).pipe(retry(1), catchError(this.handleError)).subscribe((data)=>{
          row.count=data;          
        })
        this.Threads.push(row);
      }
     
    })
    
  }

  goToSubThreads()
  {
    this._document.defaultView.location.reload();       
  }
  goToSubForumPage()
  {
    localStorage.setItem("subforum","");
    localStorage.setItem("subforumname","");

    this.router.navigate(['/subforum']);      
  }
  goToForumPage()
  {
    localStorage.setItem("subforumname","");
    localStorage.setItem("subforum","");
    localStorage.setItem("category","");
    this.router.navigate(['/forums']);
  }

  onSubmit(f: NgForm) {
    this.threadService.addThread(f.value).subscribe((data: any)=>{
      console.log(data);
    })  
  }

  findById(f: NgForm) {
    this.threadService.getThreadId(f.value.id).subscribe((data: any)=>{
      console.log(data);
    })  
  }

  setPost(event,row)
  {
    let x:number=row.id-1;
    localStorage.setItem("post",x.toString());
    localStorage.setItem("postname",row.namePost);

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
