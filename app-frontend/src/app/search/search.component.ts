import { Thread } from './../shared/models/thread';
import { SearchThread } from './searchthread';
import {SubForum} from "../shared/models/subforum";
import { LastPost } from '../shared/models/lastpost';

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType,HttpErrorResponse } from '@angular/common/http';
import { NgForm }   from '@angular/forms';
import { Observable} from 'rxjs';
import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  Threads:Array<Thread>;
  SubForums:Array<SubForum>;
  selectPost = ['thread','subforum'];
  selectedValue = 'thread';

  constructor( private http: HttpClient) {
    this.Threads=new Array<Thread>();
    this.SubForums=new Array<SubForum>();

   }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void{
    if(this.selectedValue=='thread')
    {
      this.Threads=new Array<Thread>();
        this.http.post<any>('http://localhost:8080/thread/search',form.value).pipe(retry(1), catchError(this.handleError)).subscribe((data: Array<Thread>)=>{
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
    if(this.selectedValue=='subforum')
    {
      this.SubForums=new Array<SubForum>();
        this.http.post<any>('http://localhost:8080/subforum/search',form.value).pipe(retry(1), catchError(this.handleError)).subscribe((data: Array<SubForum>)=>{
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
       console.log(this.SubForums);
    })
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

}
