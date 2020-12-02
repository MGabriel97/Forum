import { Component, OnInit,Input } from '@angular/core';
import { Thread } from './../shared/models/thread';

@Component({
  selector: 'app-threadlist',
  templateUrl: './threadlist.component.html',
  styleUrls: ['./threadlist.component.css']
})
export class ThreadlistComponent implements OnInit {
  @Input() Threads:Array<Thread>;
  image:any;
  config:any;
  titleSorted:number=0;
  constructor() { 
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
  }
  setPost(event,row)
  {
    let x:number=row.id-1;
    localStorage.setItem("post",x.toString());
    localStorage.setItem("postname",row.namePost);

  }
  setSubforum(event,row,category)
  {
    localStorage.setItem("subforumname",row.subForumName);
    localStorage.setItem("category",category);

    localStorage.setItem("subforum",row.id);
  }

  sortByTitle()
  {
    if(this.titleSorted==0)
    {
      this.Threads.sort((a,b) => a.namePost.localeCompare(b.namePost));
      this.titleSorted=1;
    }
    else
    {
      this.Threads.sort((a,b) => b.namePost.localeCompare(a.namePost));
      this.titleSorted=0;
    }
  }

  sortByReply()
  {
    if(this.titleSorted==0)
    {
      this.Threads.sort((a,b) => a.count.localeCompare(b.count));
      this.titleSorted=1;
    }
    else
    {
      this.Threads.sort((a,b) => b.count.localeCompare(a.count));
      this.titleSorted=0;
    }
    
  }
  sortBySubForum()
  {
    if(this.titleSorted==0)
    {
      this.Threads.sort((a,b) => a.subForum.subForumName.localeCompare(b.subForum.subForumName));
      this.titleSorted=1;
    }
    else
    {
      this.Threads.sort((a,b) => b.subForum.subForumName.localeCompare(a.subForum.subForumName));
      this.titleSorted=0;
    } 
  }
  sortByDate()
  {
    if(this.titleSorted==0)
    {
      this.Threads.sort((a,b) => a.dateTime.localeCompare(b.dateTime));
      this.titleSorted=1;
    }
    else
    {
      this.Threads.sort((a,b) => b.dateTime.localeCompare(a.dateTime));
      this.titleSorted=0;
    } 
  }
}
