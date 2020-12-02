import { Component, OnInit } from '@angular/core';
import {Post} from "../shared/models/post";
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Thread } from './../shared/models/thread';
import { LastPost } from '../shared/models/lastpost';

@Component({
  selector: 'app-newposts',
  templateUrl: './newposts.component.html',
  styleUrls: ['./newposts.component.css']
})
export class NewpostsComponent implements OnInit {
  posts:Array<Post>;
  Threads:Array<Thread>;
  selectPost = ['threads','posts'];
  selectTime = ['day','week'];
  selectedTime = 'day';

  selectedValue = 'threads';

  constructor(private http: HttpClient) { 
    this.Threads=new Array<Thread>();
    this.posts=new Array<Post>();
  }

  ngOnInit(): void {
    this.http.get('http://localhost:8080/thread/lastday/').pipe(retry(1), catchError(this.handleError)).subscribe((data:Array<Thread>)=>{
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
  searchPosts()
  {
    if(this.selectedValue=="threads")
    {
      this.Threads=new Array<Thread>();
    this.http.get('http://localhost:8080/thread/last'+this.selectedTime).pipe(retry(1), catchError(this.handleError)).subscribe((data:Array<Thread>)=>{
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
    if(this.selectedValue=="posts")
    {
      this.posts=new Array<Post>();

    this.http.get('http://localhost:8080/post/last'+this.selectedTime).pipe(retry(1), catchError(this.handleError)).subscribe((data:Array<Post>)=>{
      this.posts=data; 

    })
    }
    
  }

}
