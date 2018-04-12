import { Component, OnInit } from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';



@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  public loginEmailId: string ;
  public loginPassword: string ;
  public registerFullName: string;
  public registerEmailId: string ;
  public registerPassword: string ;
  
  constructor() { 
    this.loginEmailId = "";
    this.loginPassword = "";
    this.registerEmailId = "";
    this.registerFullName = "";
    this.registerPassword = "";
  }

  ngOnInit() {
    console.log(Md5.hashStr("omkar"));
    console.log(Md5.hashStr("omkar", true));
    console.log(Md5.hashAsciiStr("omkar"));
    console.log(Md5.hashAsciiStr("omkar", true));
  }

  userLogin(){
    if(this.loginEmailId=="admin@admin.com" && this.loginPassword=="admin1234"){
      // login with admin priviledges
      console.log("Admin Login with creds -> ", this.loginEmailId, this.loginPassword);
    }
    else{
      // check in db for the emailid and password
      console.log("User Login with creds -> ", this.loginEmailId, this.loginPassword);
    }
  }

  userRegister(){
    console.log("Register User creds -> ", this.registerEmailId, this.registerFullName, this.registerPassword)
  }


}
