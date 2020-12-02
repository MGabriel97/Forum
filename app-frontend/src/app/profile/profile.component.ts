import { Reply } from './../shared/models/Reply';
import { Post } from './../shared/models/post';
import { User } from './../shared/models/user';
import { ReplyService } from './../services/reply.service';
import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';
import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient, HttpEventType,HttpErrorResponse,HttpHeaders  } from '@angular/common/http';
import { NgForm }   from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileUser:User;
  Post:Array<Post>;
  Reply:Array<Reply>;

  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  image:any;


  constructor(
    private http: HttpClient,
    private postService: PostService,
    private replyService: ReplyService) { 
      this.profileUser=<User>{};
    }

  ngOnInit(): void {

    this.http.get('http://localhost:8080/user/findbyid/'+localStorage.getItem("user")).pipe(retry(1), catchError(this.handleError)).subscribe((data:User)=>{
      this.profileUser=data;
    });

    this.http.get('http://localhost:8080/user/getimage/'+localStorage.getItem("user")).pipe(retry(1), catchError(this.handleError)).subscribe((data:User)=>{
      this.image=data;
      this.retrievedImage = 'data:image/jpeg;base64,' + this.image.image;
    });

    this.replyService.getReplyByUser().subscribe((data: Array<Reply>)=>{
      this.Reply=data;
    }) 
    this.postService.getPostByUser().subscribe((data: Array<Post>)=>{
      this.Post=data;
    }) 
  }

  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
    this.changeImage();
  }
  
  changeImage()
  {
    console.log(this.selectedFile);
    
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    let body = new FormData();
    // Add file content to prepare the request
    body.append("image", this.selectedFile);
    
    //Make a call to the Spring Boot Application to save the image
    this.http.post('http://localhost:8080/user/updateimage/'+localStorage.getItem("user"), body)
    .subscribe(
      // Admire results
      (data) => {console.log(data)},
      // Or errors :-(
      error => console.log(error),
      // tell us if it's finished
      () => { console.log("completed") }
    );
  }
  onUpload() {
    
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
















  /* selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  //Gets called when the user selects an image
  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
  }
  //Gets called when the user clicks on submit to upload the image
  onUpload() {
    console.log(this.selectedFile);
    var username = (<HTMLInputElement>document.getElementById('username')).value;
    var email = (<HTMLInputElement>document.getElementById('email')).value;

    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('username', username);
    uploadImageData.append('email',email);
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
  
    //Make a call to the Spring Boot Application to save the image
    this.httpClient.post('http://localhost:8080/image/upload', uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
        } else {
          this.message = 'Image not uploaded successfully';
        }
      }
      );
  }


  edit() {
    console.log(this.selectedFile);
    var username = (<HTMLInputElement>document.getElementById('username')).value;
    var email = (<HTMLInputElement>document.getElementById('email')).value;

    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('username', username);
    uploadImageData.append('email',email);
    uploadImageData.append('profileImage', this.selectedFile);
  
    //Make a call to the Spring Boot Application to save the image
    this.httpClient.post('http://localhost:8080/image/update', uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
        } else {
          this.message = 'Image not uploaded successfully';
        }
      }
      );
  }
    //Gets called when the user clicks on retieve image button to get the image from back end
    getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get('http://localhost:8080/image/get/' + this.imageName)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.profileImage;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }*/

}
