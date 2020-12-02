import { Reply } from './../shared/models/Reply';
import { AddReply } from './../shared/models/addreply';
import { User } from './../shared/models/user';

import { ReplyService } from './../services/reply.service';
import { PostService } from './../services/post.service';
import { Component, OnInit,Inject} from '@angular/core';
import {Post} from "../shared/models/post";
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import {NgForm} from '@angular/forms';
import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient, HttpEventType,HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  
  Post:Post;
  Reply:Array<Reply>;
  config:any;
  category:string;subforum:string;postName:string;
  user:string;
  auth:string;
  input:string;
  constructor(private postService: PostService,private replyService: ReplyService, private http: HttpClient,
    private router: Router
    ,@Inject(DOCUMENT) private _document: Document) { 
    this.Post=new Post();
    this.Reply=new Array<Reply>();

    this.config = {
      itemsPerPage: 20,
      currentPage: 1,
      totalItems: 1+this.Reply.length
    };
  }
  pageChanged(event){
    this.config.currentPage = event;
  }

  ngOnInit(): void {
    this.auth=sessionStorage.getItem("auth");

    this.input="";
    this.user=localStorage.getItem("user");
    console.log(this.user);
    this.category=localStorage.getItem("category");
    this.subforum=localStorage.getItem("subforumname");
    this.postName=localStorage.getItem("postname");


    this.postService.getPostId().subscribe((data: Post)=>{
      this.Post=data;

      this.http.get('http://localhost:8080/user/getimage/'+data.user.id).pipe(retry(1), catchError(this.handleError)).subscribe((dataImage:User)=>{
      this.Post.image = 'data:image/jpeg;base64,' + dataImage.image;
    });
    })  
    this.replyService.getReplyByPost().subscribe((data: Array<Reply>)=>{
      for(let row of data)
      {
        this.http.get('http://localhost:8080/user/getimage/'+row.user.id).pipe(retry(1), catchError(this.handleError)).subscribe((dataImage:User)=>{
          row.image = 'data:image/jpeg;base64,' + dataImage.image;
        });
        this.Reply.push(row);
      }

    }) 
    
  }
  onSubmit(f: NgForm) {
    this.postService.addPost(f.value).subscribe((data: any)=>{
      console.log(data);
    })  
  }

  gotToPostPage()
  {
    this._document.defaultView.location.reload();       

  }
  goToSubThreads()
  {
    localStorage.setItem("post","");
    localStorage.setItem("postname","");
    this.router.navigate(['/thread']);      

  }
  goToSubForumPage()
  {
    localStorage.setItem("subforum","");
    localStorage.setItem("subforumname","");
    localStorage.setItem("post","");
    localStorage.setItem("postname","");
    this.router.navigate(['/subforum']);      
  }
  goToForumPage()
  {
    localStorage.setItem("subforumname","");
    localStorage.setItem("subforum","");
    localStorage.setItem("category","");
    localStorage.setItem("post","");
    localStorage.setItem("postname","");
    this.router.navigate(['/forums']);
    
  }

  createInput()
  {
    this.input="ok";
  }
  addReply(value:any)
  {
    this.input="";
    let  addReply=new AddReply();
    addReply.dataPost=value;
    addReply.userPostId=localStorage.getItem("user");
    addReply.namePostId=localStorage.getItem("post");
    addReply.userPost="";
    this.http.post<any>('http://localhost:8080/reply/addid',addReply).pipe(retry(1), catchError(this.handleError)).subscribe((data: any)=>{
      this._document.defaultView.location.reload();       
    });
  }
  cancelReply()
  {
    this.input="";
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
