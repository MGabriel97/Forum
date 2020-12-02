import { ReplyService } from './../services/reply.service';
import { Component, OnInit } from '@angular/core';
import {Reply} from "../shared/models/reply";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {

  Post:Array<Reply>;
  constructor(private replyService: ReplyService) { }

  ngOnInit(): void {
    this.replyService.getReplys().subscribe((data: any[])=>{
      console.log(data);
    })  
  }
  onSubmit(f: NgForm) {
    var formData: any = new FormData();
    formData.append("userPost", "");
    formData.append("dataPost", "asd");
    localStorage.setItem("user","1");
    formData.append("namePostId", localStorage.getItem("post"));
    formData.append("userPostId", localStorage.getItem("user"));
    let Forms=
    {
      "userPost": "asd",
      "dataPost":  (<HTMLInputElement>document.getElementById('dataPost')).value,
      "userPostId":+localStorage.getItem("post"),
      "namePostId":+ localStorage.getItem("user")
    }
    for (var data of formData) {
      console.log(data);
    }

    this.replyService.addReply(Forms).subscribe((data: any)=>{
      console.log(Forms);
    })  
  }

  findById(f: NgForm) {
    this.replyService.getReplyId(f.value.id).subscribe((data: any)=>{
      console.log(data);
    })  
  }

}
