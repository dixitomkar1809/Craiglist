import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { PagerService } from "../_services/index";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private userData: any[];
  private fullName: string;
  private address: string;
  private city: string;
  private state: string;
  private country: string;
  private phoneNo: string;
  private emailId: string;
  private serviceInfo: any[];
  private userId: string;
  private zipcode: string;
  public searchString: string;
  private myPosts: any[];
  private userServices: any[];
  private emailIdChangedMessage: string;
  private phoneNoChangedMessage: string;
  private addressChangedMessage: string;
  pager: any = {};

  pagedItems: any[];
  private serviceCategories: any[];
  private hiddenServices: any[];
  private wishlist: any[];

  private wishlistitems: any[];

  constructor(private httpClient: HttpClient, private pagerService: PagerService) {
    this.searchString = "";
    this.emailIdChangedMessage = "";
    this.phoneNoChangedMessage = "";
    this.addressChangedMessage = "";
    this.userId = JSON.parse(sessionStorage.getItem('user')).userId;
    // getting user details
    this.httpClient.get("http://localhost:3000/api/users/get/" + this.userId)
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
        })
    this.httpClient.get("http://localhost:3000/api/service/all")
      .subscribe(
        (data: any[]) => {
          this.serviceInfo = data;
          this.setPage(1);
        })
    // make a call to the api that gives you list of all service categories
    this.httpClient.get("http://localhost:3000/api/service/serviceCategoriesAll")
      .subscribe(
        (data: any[]) => {
          //console.log(data);
          this.serviceCategories = data;
        }
      )

    // make a call to the api that gives you list of all hidden services
    this.httpClient.get("http://localhost:3000/api/hideService/get/" + this.userId)
      .subscribe(
        (data: any[]) => {
          //console.log(data);
          this.hiddenServices = data;
        }
      )

    // make a call to the api that gives you list of all wishlist
    this.httpClient.get("http://localhost:3000/api/wishlist/get/" + this.userId)
      .subscribe(
        (data: any[]) => {
          //console.log(data);
          this.wishlist = data;
        }
      )

  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.serviceInfo.length, page);

    // get current page of items
    this.pagedItems = this.serviceInfo.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  ngOnInit() {

  }

  searchService(data) {
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

  searchServiceByCategory(data) {
    console.log(data);
  }

  getServicesByUser() {
    console.log("here");
    return this.httpClient.get('http://localhost:3000/api/service/getByUser/' + this.userId)
      .subscribe(
        (data: any[]) => {
          console.log(data);
          this.userServices = data;
        }
      )
  }

  getHiddenServices() {

  }
    //make a call to the api that gives you list of all wishlistitems
  getWishlistItems(wishlistid : number) {

    this.httpClient.get("http://localhost:3000/api/wishlistitems/get/"+wishlistid)
      .subscribe(
        (data: any[]) => {
          //console.log(data);
          this.wishlistitems = data;
        }
      )
  }

  addItemsToWishlist() {

  }

  addService() {

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
}
