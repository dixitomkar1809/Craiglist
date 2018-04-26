import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { print } from 'util';

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
  public serviceUserName: string;
  public serviceUserPhone: string;
  public serviceUserEmail: string;
  public updatableForm: boolean = false;
  public serviceCategories: any;
  public serviceCategoryId: number;
  public serviceIsAvailable: any;
  public serviceImage:any;
  public serviceCategory: any;
  public showContactDetails = false;


  constructor(private httpClient: HttpClient, private router: Router) {
    if (sessionStorage.length <= 1) {
      this.router.navigate['/']
    }
    // this.userId = JSON.parse(sessionStorage.getItem('user')).userId;
    this.userId = JSON.parse(sessionStorage.getItem('user')).userId;
    // getting admin details
    if (this.userId == "0") {
      this.isAdmin = true;
    }
    this.serviceId = JSON.parse(sessionStorage.getItem('service')).serviceId;
    // console.log(this.serviceId);
    this.getServiceDetails(this.serviceId);
    this.getServiceCategories();
  }

  ngOnInit() {
    
  }

  getServiceCategories() {
    this.httpClient.get("http://localhost:3000/api/service/serviceCategoriesAll")
      .subscribe(
        (data: any[]) => {
          //console.log(data);
          this.serviceCategories = data;
        });
  }
  getServiceDetails(value) {
    this.httpClient.get('http://localhost:3000/api/service/' + value)
      .subscribe(
        (data: any[]) => {
          console.log(data);
          this.serviceInfo = data[0];
          this.serviceName = this.serviceInfo.serviceName;
          this.servicePrice = this.serviceInfo.servicePrice;
          this.serviceCategoryId = this.serviceInfo.serviceCategoryId;
          this.serviceDesc = this.serviceInfo.serviceDescription;
          this.serviceUserId = this.serviceInfo.serviceUserId;
          this.serviceIsAvailable = this.serviceInfo.isAvailable;
          this.serviceImage = this.serviceInfo.serviceImageName;
          this.serviceCategory = this.serviceInfo.serviceCategoryName;
          // console.log(this.serviceInfo);
          console.log(this.serviceUserId);
          // console.log(this.serviceIsAvailable);
        }
      )
  }

  goBack() {
    sessionStorage.removeItem('service');
    this.router.navigate(['dashboard'])
  }

  toggleUpdate() {
    if (!this.updatableForm) {
      this.updatableForm = true;
    }
  }

  updateService() {
    this.httpClient.get("http://localhost:3000/api/service/updateService/" + this.serviceName + "/" + this.servicePrice + "/" + this.serviceDesc + "/" + this.serviceId)
      .subscribe(
        (data: any[]) => {
          // console.log(data);
        }
      )
    this.updatableForm = false;
  }

  getUserDetails(value) {
    this.httpClient.get("http://localhost:3000/api/users/get/" + this.serviceUserId)
      .subscribe(
        (data: any[]) => {
          console.log(data);
          this.serviceUserEmail = data[0].emailId;
          this.serviceUserName = data[0].fullName;
          this.serviceUserPhone = data[0].phoneNo;
          this.showContactDetails = true;
        }
      )
  }

  addToWishList() {
    return this.httpClient.get('http://localhost:3000/api/wishlist/add/' + this.serviceId + '/' + this.userId)
      .subscribe(
        (data: any[]) => {
          console.log(data);
        }
      )
  }

  continueService(){
    return this.httpClient.get('http://localhost:3000/api/service/continue/'+this.serviceId)
    .subscribe(
      (data:any[]) => {
        console.log(data);
        this.getServiceDetails(this.serviceId);
      }
    )
  }

  discontinueService(){
    return this.httpClient.get('http://localhost:3000/api/service/discontinue/'+this.serviceId)
    .subscribe(
      (data:any[]) => {
        console.log(data);
        this.getServiceDetails(this.serviceId);
      }
    )
  }
}
