import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { PagerService } from "../_services/index";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Headers, Http, RequestOptions, Response } from '@angular/http'
import { HttpResponse } from 'selenium-webdriver/http';
import { SlicePipe } from '@angular/common';

import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public userData: any[];
  public fullName: string;
  public address: string;
  public city: string;
  public state: string;
  public country: string;
  public phoneNo: string;
  public emailId: string;
  public serviceInfo: any[];
  public userId: string;
  public zipcode: string;
  public isActive: any;
  public searchString: string;
  public myPosts: any[];
  public userServices: any[];
  public emailIdChangedMessage: string;
  public phoneNoChangedMessage: string;
  public addressChangedMessage: string;
  pager: any = {};
  pagedItems: any[];
  public serviceCategories: any[];
  public hiddenServices: any[];
  public wishlist: any[];
  public wishlistitems: any[];
  public isAdmin: boolean;
  public usersAll: any[];
  userPager: any = {};
  userPagedItems: any[];
  public searchInput: string;
  public selectedCategories: any;
  panelOpenState: boolean = false;
  public selectedFile = null;
  public postHeaders;
  public addServiceData: any;
  public addServiceName: string;
  public addServicePrice: string;
  public addServiceCategory: any;
  public addServiceDesc: string;
  addServiceForm: FormGroup;

  constructor(private httpClient: HttpClient, private pagerService: PagerService, private router: Router, private location: Location, private fb: FormBuilder) {

    // console.log(sessionStorage);
    this.searchString = "";
    this.emailIdChangedMessage = "";
    this.phoneNoChangedMessage = "";
    this.addressChangedMessage = "";
    if (sessionStorage.length == 0) {
      sessionStorage.clear();
      this.router.navigate(['']);
    }
    this.userId = JSON.parse(sessionStorage.getItem('user')).userId;
    // getting admin details
    if (this.userId == "0") {
      this.isAdmin = true;
      this.getAllUsers();
      this.isActive = 0;
    }
    // getting user details
    else {
      // add ServiceForm
      this.addServiceForm = this.fb.group({
        'addServiceName': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
        'addServicePrice': ['', Validators.required],
        'addServiceCategory': ['', Validators.required],
        'addServiceDesc': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
        "userId": this.userId
      });

      this.getUserDetails(this.userId);
      // get All Serives
      this.getAllServices();
      // get hidden services
      this.getHiddenServices();
      // make a call to the api that gives you list of all service categories
      this.getAllServiceCategories();
      // make a call to the api that gives you list of all wishlist
      this.getWishlistItems(this.userId);
    }
    this.getServicesByUser();
  }


  ngOnInit() {
    this.postHeaders = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');
  }

  getUserDetails(value) {
    return this.httpClient.get("http://localhost:3000/api/users/get/" + value)
      .subscribe(
        (data: any[]) => {
          // console.log(data[0]);
          this.userData = data[0];
          this.fullName = this.userData["fullName"];
          this.address = this.userData["address"];
          this.city = this.userData["city"];
          this.state = this.userData["state"];
          this.country = this.userData["country"];
          this.phoneNo = this.userData["phoneNo"];
          this.emailId = this.userData["emailId"];
          this.zipcode = this.userData["zipcode"];
          this.isActive = this.userData["isActive"];
          // console.log(this.userData['isActive']);
        });
  }

  getAllServiceCategories() {
    return this.httpClient.get("http://localhost:3000/api/service/serviceCategoriesAll")
      .subscribe(
        (data: any[]) => {
          //console.log(data);
          this.serviceCategories = data;
        }
      )
  }

  getAllUsers() {
    return this.httpClient.get("http://localhost:3000/api/users/usersListAll")
      .subscribe(
        (data: any[]) => {
          // console.log(data);
          this.usersAll = data;
          // console.log(this.usersAll);
        });
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.serviceInfo.length, page);

    // get current page of items
    this.pagedItems = this.serviceInfo.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log(this.pagedItems);
  }

  setUserPage(page: number) {
    if (page < 1 || page > this.userPager.totalPages) {
      return
    }
    this.userPager = this.pagerService.getPager(this.usersAll.length, page);

    this.userPagedItems = this.usersAll.slice(this.userPager.startIndex, this.userPager.endIndex + 1);
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  onUpload(value) {
    var fd = new FormData();
    fd.append('productImage', this.selectedFile, this.selectedFile.name);
    this.httpClient.post('http://localhost:3000/uploadImage', fd, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(res => {
        if (res.type === HttpEventType.UploadProgress) {
          console.log('Upload Progress: ' + Math.round(res.loaded / res.total * 100))
        }
        else if (res.type === HttpEventType.Response) {
          // console.log(res);
          console.log("res.body",res.body);
          var imgPath = res.body["destination"] + res.body["filename"];
          return this.httpClient.post('http://localhost:3000/api/setImage', { imgPath, value })
            .subscribe(
              (data: any[]) => {
                console.log(data);
                this.getAllServices();
              }
            )
        }
      });
  }


  searchService(data, data2) {
    // console.log(data);
    // console.log(data2);
    if (data && data2) {
      console.log('Both data is present');
    }
    else if (data) {
      // console.log('search is given');
      console.log("http://localhost:3000/api/services/searchInput/" + data);
      return this.httpClient.get("http://localhost:3000/api/services/searchInput/" + data)
        .subscribe(
          (data: any[]) => {
            // console.log(data);
            this.serviceInfo = data;
            this.setPage(1);
            console.log(this.serviceInfo);
          }
        )
    }
    else if (data2) {
      console.log('category is given');
    }
    else {
      console.log('none is given');
    }

  }

  searchServiceByCategory(data) {
    console.log(data);
  }

  getAllServices() {
    // get All Services
    this.httpClient.get("http://localhost:3000/api/service/all/" + this.userId)
      .subscribe(
        (data: any[]) => {
          this.serviceInfo = data;
          this.setPage(1);
        })
  }

  getHiddenServices() {
    // make a call to the api that gives you list of all hidden services
    this.httpClient.get("http://localhost:3000/api/hideService/get/" + this.userId)
      .subscribe(
        (data: any[]) => {
          //console.log(data);
          this.hiddenServices = data;
        }
      )

  }

  getServicesByUser() {
    // console.log("here");
    return this.httpClient.get('http://localhost:3000/api/service/getByUser/' + this.userId)
      .subscribe(
        (data: any[]) => {
          // console.log(data);
          this.userServices = data;
        }
      )
  }

  getWishlistItems(value) {
   return this.httpClient.get("http://localhost:3000/api/wishlist/get/" + value)
      .subscribe(
        (data: any[]) => {
          console.log(data);
          this.wishlistitems = data;
        }
      )
  }

  removeFromWishlist(value1, value2){
    return this.httpClient.get('http://localhost:3000/api/wishlist/remove/'+value1+'/'+value2)
    .subscribe(
      (data:any[]) => {
        console.log(data);
        this.getWishlistItems(this.userId);
      }
    )
  }

  openService(data) {
    console.log(data);
    sessionStorage.setItem('service', JSON.stringify({ serviceId: data }));
    // console.log(JSON.parse(sessionStorage.getItem('userId')));
    this.router.navigate(['service']);
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  addService(value) {
    console.log(value);
    return this.httpClient.post("http://localhost:3000/api/service/addService", value)
      .subscribe(
        (data: any[]) => {
          console.log('from the nodejs', data["insertId"]);
          this.getAllServices();
          if (this.selectedFile) {
            this.onUpload(data["insertId"]);
          }
        }
      )
  }

  changeEmail() {
    return this.httpClient.get("http://localhost:3000/api/users/changeEmail/" + this.userId + "/" + this.emailId)
      .subscribe(
        (data: any[]) => {
          console.log(data);
          this.emailIdChangedMessage = "Email-Id Changed !";
        }
      )
  }

  changePhoneNo() {
    return this.httpClient.get("http://localhost:3000/api/users/changePhoneNo/" + this.userId + "/" + this.phoneNo)
      .subscribe(
        (data: any[]) => {
          console.log(data);
          this.phoneNoChangedMessage = "Phone Number Changed !";
        }
      )
  }

  changeAddress() {
    return this.httpClient.get("http://localhost:3000/api/users/changeAddress/" + this.userId + "/" + this.address + "/" + this.city + "/" + this.state + "/" + this.country + "/" + this.zipcode)
      .subscribe(
        (data: any[]) => {
          console.log(data);
          this.addressChangedMessage = "Address Changed !";
        }
      )
  }

  searchByCategory() {
    //console.log(this.selectedCategories);
  }

  deactivateUser(value) {
    console.log(value);
    return this.httpClient.get("http://localhost:3000/api/users/deactivateUser/" + value)
      .subscribe(
        (data: any[]) => {
          this.getAllUsers();
        });
  }

  activateUser(value) {
    console.log(value);
    return this.httpClient.get("http://localhost:3000/api/users/activateUser/" + value)
      .subscribe(
        (data: any[]) => {
          this.getAllUsers();
        });
  }

  hideService(value) {
    this.httpClient.get('http://localhost:3000/api/hideService/add/' + value + '/' + this.userId)
      .subscribe(
        (data: any[]) => {
          this.getAllServices();
          this.getHiddenServices();
        }
      )
  }

  unhideService(value){
    this.httpClient.get('http://localhost:3000/api/hideService/remove/'+value+'/'+ this.userId)
    .subscribe(
      (data:any[]) => {
        this.getAllServices();
        this.getHiddenServices();
      }
    )
  }
}
