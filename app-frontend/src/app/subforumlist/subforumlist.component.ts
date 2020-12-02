import { Component, OnInit,Input } from '@angular/core';
import {SubForum} from "../shared/models/subforum";

@Component({
  selector: 'app-subforumlist',
  templateUrl: './subforumlist.component.html',
  styleUrls: ['./subforumlist.component.css']
})
export class SubforumlistComponent implements OnInit {
  @Input() SubForums:Array<SubForum>;
  config:any;
  titleSorted:number=0;

  constructor() {
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
  ngOnInit(): void {
  }

  setSubforum(event,row)
  {
    localStorage.setItem("subforumname",row.subForumName);

    localStorage.setItem("subforum",row.id);
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
  sortByLastPost()
  {
    if(this.titleSorted==0)
    {
      this.SubForums.sort((a,b) => a.dateTime.localeCompare(b.dateTime));
      this.titleSorted=1;
    }
    else
    {
      this.SubForums.sort((a,b) => b.dateTime.localeCompare(a.dateTime));
      this.titleSorted=0;
    } 
  }

}
