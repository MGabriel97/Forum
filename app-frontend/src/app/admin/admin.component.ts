import { Component, OnInit } from '@angular/core';
import * as CanvasJS from './canvasjs.min';
import { PostService } from './../services/post.service';
import {Post} from "../shared/models/post";
import { ThreadService } from './../services/thread.service';
import { Thread } from './../shared/models/thread';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  Post:Array<Post>;
  tableDate:Array<String>;
  diffDate:Array<String>;
  mostPost:number=0;
  mostSearch:String="";
mostActive:String="";
  Threads:Array<Thread>;

  constructor(private postService: PostService,private threadService: ThreadService) { 
    this.Post=new Array<Post>();
    this.Threads=new Array<Thread>();

    this.tableDate=new Array<String>();
    this.diffDate=new Array<String>();


  }

  ngOnInit() {
    this.postService.getPosts().subscribe((data: Array<Post>)=>{
      this.Post=data;
      let users=new Array<String>();
      for(let row of this.Post)
      {
        users.push(row.user.username);
        this.tableDate.push(row.dateTime.substr(4,6));
      }
      let map = new Map<String, number>(); 
      let mapUsers = new Map<String, number>(); 

      for(let row of this.tableDate)
      {
        if( !this.diffDate.includes(row))
        {
          this.diffDate.push(row);
          map.set(row,0);

        }
      }
      for(let row of this.tableDate)
      {
        map.set(row,(map.get(row)+1));      
      }
      for(let row of this.tableDate)
      {
        if(map.get(row)>this.mostPost)
        {
          this.mostPost=(map.get(row));
        }
      }
      let arr1=[];
      for(let row of this.diffDate)
      {
        arr1.push({y:map.get(row),label:row})
      }
      let chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: "Posts"
        },
        data: [{
          type: "column",
          dataPoints: arr1
        }]
      });
      chart.render();




      let usersDiff=new Array<String>();
      for(let row of users)
      {
        if( !usersDiff.includes(row))
        {
          usersDiff.push(row);
          mapUsers.set(row,0);

        }
      }
      for(let row of users)
      {
        mapUsers.set(row,(mapUsers.get(row)+1));      
      }
      let aux=0;
      for(let row of usersDiff)
      {
        if(mapUsers.get(row)>aux)
        {
          aux=mapUsers.get(row);
          this.mostActive=row;
        }
      }
      let arr2=[];
      for(let row of usersDiff)
      {
        arr2.push({y:mapUsers.get(row),label:row})
      }

      let chart1 = new CanvasJS.Chart("chartContainer2", {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: "Most active users"
        },
        data: [{
          type: "column",
          dataPoints: arr2
        }]
      });
        
      chart1.render();
    });
    
    


		this.threadService.getThreads().subscribe((data: Array<Thread>)=>{
      this.Threads=data;
      let subForum= new Array<String>();
      for(let row of data)
      {
        subForum.push(row.subForum.subForumName);

      }
      let map = new Map<String, number>(); 
      let subForumNr= new Array<String>();

      for(let row of subForum)
      {
        if( !subForumNr.includes(row))
        {
          subForumNr.push(row);
          map.set(row,0);

        }
      }
      for(let row of subForum)
      {
        map.set(row,(map.get(row)+1));      
      }
      let aux=0;
      for(let row of subForum)
      {
        if(map.get(row)>aux)
        {
          aux=map.get(row);
          this.mostSearch=row;
        }
      }
      let arr1=[];
      for(let row of subForumNr)
      {
        arr1.push({y:map.get(row),name:row})
      }
      let chart = new CanvasJS.Chart("chartContainer1", {
        theme: "light2",
        animationEnabled: true,
        exportEnabled: true,
        title:{
          text: "Monthly Sub-Forum"
        },
        data: [{
          type: "pie",
          showInLegend: true,
          toolTipContent: "<b>{name}</b>: {y} (#percent%)",
          indexLabel: "{name} - #percent%",
          dataPoints: arr1
        }]
      });
      chart.render();
    });

    
      
  

    

    }

}
