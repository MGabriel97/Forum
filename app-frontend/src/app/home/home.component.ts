import { Component, OnInit } from '@angular/core';
import {SubForum} from "../shared/models/subforum";
import {SubforumService} from "../services/subforum.service"
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LastPost } from '../shared/models/lastpost';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  SubForums:Array<SubForum>;
  config: any;
  categories:Array<String>;
  auth:string;
  titleSorted:number=0;

  constructor(private subforumService: SubforumService,private http: HttpClient,private router: Router) { 
    this.SubForums=new Array<SubForum>();  
    this.categories=new Array<String>();

  }
 

  ngOnInit(): void {
    this.auth=sessionStorage.getItem("auth");
    this.subforumService.getSubForumsOrder().subscribe((data: Array<SubForum>)=>{
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

      for(let row of this.SubForums)
    {
     
        if(this.categories.includes(row.category))
        {}
        else
        {
          this.categories.push(row.category);
        }
    }
    localStorage.setItem("categories", JSON.stringify(this.categories));
    })  
  
    
    
  }

  goToSubForumPage(event,category)
  {
    localStorage.setItem("category",category);
    this.router.navigate(['/subforum']);
  }

  setSubforum(event,row,category)
  {
    localStorage.setItem("subforumname",row.subForumName);
    localStorage.setItem("category",category);

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

  sortByName()
  {
    if(this.titleSorted==0)
    {
      this.SubForums.sort((a,b) => a.subForumName.localeCompare(b.subForumName));
      this.titleSorted=1;
    }
    else
    {
      this.SubForums.sort((a,b) => b.subForumName.localeCompare(a.subForumName));
      this.titleSorted=0;
    } 
  }
  sortByPosts()
  {
    if(this.titleSorted==0)
    {
      this.SubForums.sort((a,b) => a.count.localeCompare(b.count));
      this.titleSorted=1;
    }
    else
    {
      this.SubForums.sort((a,b) => b.count.localeCompare(a.count));
      this.titleSorted=0;
    } 
  }

}
