import { Component, OnInit, Inject, Injectable } from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

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
  public registerError: string;
  public loginMessage: string;
  public registerSuccess: string;
  public hashedPassword: any;
  
  constructor(private httpClient: HttpClient, private router: Router) { 
    
  }

  ngOnInit() {
    this.loginEmailId = "";
    this.loginPassword = "";
    this.registerEmailId = "";
    this.registerFullName = "";
    this.registerPassword = "";
  }

  userLogin(){
    if(this.loginEmailId=="admin@admin.com" && this.loginPassword=="admin1234"){
      // login with admin priviledges
      console.log("Admin Login with creds -> ", this.loginEmailId, this.loginPassword);
    }
    else{
      // check in db for the emailid and password
      this.hashedPassword = Md5.hashStr(this.loginPassword);
      // console.log("User Login with creds -> ", this.loginEmailId, this.hashedPassword);
      return this.httpClient.get("http://localhost:3000/api/users/login/"+this.loginEmailId+"/"+this.hashedPassword)
      .subscribe(
        (data:any)=>{
          console.log(data);
          sessionStorage.setItem('user', JSON.stringify({userId: data[0].userId}));
          // console.log(JSON.parse(sessionStorage.getItem('userId')));
          this.router.navigate(['dashboard']);
        }
      )
    }
  }

  userRegister(){
    console.log("Register User creds -> ", this.registerEmailId, this.registerFullName, this.registerPassword);
    return this.httpClient.get("http://localhost:3000/api/users/findUser/"+this.registerEmailId)
      .subscribe(
        (data:any[]) => {
          console.log(data.length);
          if(data.length==0){
            // Register the User
            this.hashedPassword = Md5.hashStr(this.registerPassword);
            return this.httpClient.get("http://localhost:3000/api/users/register/"+this.registerFullName+"/"+this.hashedPassword+"/"+this.registerEmailId)
            .subscribe(
              (data:any[])=>{
                console.log(data);
                this.registerSuccess = "Succesfully Registered ! Please Login !";
                this.registerError = "";
              }
            )
          }
          else{
            // Show the error message that the user is already registered
            this.registerError = "User already Exists !";
            this.registerSuccess = "";
          }
        }
      )
  }


  
}
