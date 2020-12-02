import { Component, OnInit,Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  auth:any;
  constructor(@Inject(DOCUMENT) private _document: Document ) { }
  role:String="";
  ngOnInit(): void {
    if(sessionStorage.getItem("auth")==null)
    {
      sessionStorage.setItem("auth","false");
    }
    this.auth=sessionStorage.getItem("auth");
    this.role=localStorage.getItem("role");
   
  }
  logout()
  {
    sessionStorage.setItem("auth","false") ;
    this._document.defaultView.location.reload(); 
  }

 
}
