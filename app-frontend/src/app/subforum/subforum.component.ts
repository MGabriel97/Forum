import { User } from './../shared/models/user';
import { Component, OnInit,Inject } from '@angular/core';
import {SubForum} from "../shared/models/subforum";
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import {SubforumService} from "../services/subforum.service"
import {NgForm} from '@angular/forms';
import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { LastPost } from '../shared/models/lastpost';

@Component({
  selector: 'app-subforum',
  templateUrl: './subforum.component.html',
  styleUrls: ['./subforum.component.css']
})
export class SubforumComponent implements OnInit {
  SubForums:Array<SubForum>;
  config: any;
  category: string;
  auth:string;
  constructor(private subforumService: SubforumService,private http: HttpClient,private router: Router
    ,@Inject(DOCUMENT) private _document: Document) { 
    this.SubForums=new Array<SubForum>();

    this.config = {
      itemsPerPage: 20,
      currentPage: 1,
      totalItems: this.SubForums.length
    };
  }
  pageChanged(event){
    this.config.currentPage = event;
  }
  goToSubForumPage()
  {
    this._document.defaultView.location.reload();       
  }
  goToForumPage()
  {
    localStorage.setItem("category","");
    this.router.navigate(['/forums']);
  }

  ngOnInit(): void {
    this.auth=sessionStorage.getItem("auth");
    this.category=localStorage.getItem("category");
    this.http.get('http://localhost:8080/user/findbyid/'+localStorage.getItem("user")).pipe(retry(1), catchError(this.handleError)).subscribe((data: User)=>{
      localStorage.setItem("role",data.role);

    });
    this.subforumService.findByCategory().subscribe((data: Array<SubForum>)=>{
      for(let row of data)
      {
        
        this.http.get('http://localhost:8080/thread/findlastpost/'+row.id).pipe(retry(1), catchError(this.handleError)).subscribe((data:LastPost)=>{
          row.name=data.name;   
          row.dateTime=data.dateTime;       
        })
      this.http.get('http://localhost:8080/thread/count/'+row.id,{responseType: 'text'}).pipe(retry(1), catchError(this.handleError)).subscribe((data)=>{
          row.count=data;          
        })
        this.SubForums.push(row);
      }
    })  
  }
  onSubmit(f: NgForm) {
    this.subforumService.addSubForum(f.value).subscribe((data: any)=>{
      console.log(data);
    })  
  }

  findById(f: NgForm) {
    this.subforumService.getSubForumId(f.value.id).subscribe((data: any)=>{
      console.log(data);
    })  
  }
  setSubforum(event,row)
  {
    localStorage.setItem("subforumname",row.subForumName);

    localStorage.setItem("subforum",row.id);
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
