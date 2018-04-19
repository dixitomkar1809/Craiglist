import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  public serviceId: string;
  public serviceInfo: any;
  public serviceImages: any[];
  public userId: string;
  public isAdmin: boolean;
  public serviceName: string;
  public servicePrice: string;
  public serviceDesc: string;
  public serviceUserId: string;
  public serviceUserName:string;
  public serviceUserPhone:string;
  public serviceUserEmail:string;


  constructor(private httpClient: HttpClient, private router: Router) { 
    if(sessionStorage.length<=1){
      this.router.navigate['/']
    }
    // this.userId = JSON.parse(sessionStorage.getItem('user')).userId;
    this.userId = JSON.parse(sessionStorage.getItem('user')).userId;
      // getting admin details
  if(this.userId == "0"){
    this.isAdmin=true;
  }

    this.serviceId = JSON.parse(sessionStorage.getItem('service')).serviceId;
    // console.log(this.serviceId);
    this.httpClient.get('http://localhost:3000/api/service/'+this.serviceId)
    .subscribe(
      (data:any[]) => {
        // console.log(data);
        this.serviceInfo = data[0];
        this.serviceName = this.serviceInfo.serviceName;
        this.servicePrice = this.serviceInfo.servicePrice;
        this.serviceDesc = this.serviceInfo.serviceDescription;
        this.serviceUserId = this.serviceInfo.serviceUserId;
        console.log(this.serviceInfo);
      }
    )
    this.httpClient.get('http://localhost:3000/api/service/getImages/'+this.serviceId)
    .subscribe(
      (data:any[]) => {
        console.log(data);
      }
    )
  }

  ngOnInit() {
  }

  getUserDetails(value){
    this.httpClient.get("http://localhost:3000/api/users/get/"+this.serviceUserId)
    .subscribe(
      (data:any[])=>{
        console.log(data);
      }
    )
  }
}
