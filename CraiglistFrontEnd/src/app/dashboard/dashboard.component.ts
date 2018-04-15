import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private userData:any[];
  private fullName: string;
  private address: string;
  private city: string;
  private state: string;
  private country: string;
  private phoneNo: string;
  private emailId: string;
  private serviceInfo: any[] ;
  private userId:string;
  private zipcode: string;
  public searchString: string;
  private myPosts: any[];
  private userServices: any[];
  private serviceCategories: any[];
  private hiddenServices: any[];
  private wishlist: any[];

  private wishlistitems: any[];

  constructor(private httpClient: HttpClient) {
    this.searchString = "";
    this.userId = JSON.parse(sessionStorage.getItem('user')).userId;
    // getting user details
    this.httpClient.get("http://localhost:3000/api/users/get/"+this.userId)
    .subscribe(
      (data:any[]) => {
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
      }
    )
    // make a call to the api that gives you list of all service categories
    this.httpClient.get("http://localhost:3000/api/service/serviceCategoriesAll")
    .subscribe(
      (data:any[]) => {
        //console.log(data);
        this.serviceCategories = data;
      }
    )

    // make a call to the api that gives you list of all hidden services
    this.httpClient.get("http://localhost:3000/api/hideService/get/"+this.userId)
        .subscribe(
          (data:any[]) => {
            //console.log(data);
            this.hiddenServices = data;
          }
        )
    
    // make a call to the api that gives you list of all wishlist
    this.httpClient.get("http://localhost:3000/api/wishlist/get/"+this.userId)
        .subscribe(
          (data:any[]) => {
            //console.log(data);
            this.wishlist = data;
          }
        )

    // make a call to the api that gives you list of all wishlistitems
    this.httpClient.get("http://localhost:3000/api/wishlistitems/get/"+"")
        .subscribe(
          (data:any[]) => {
            //console.log(data);
            this.wishlistitems = data;
          }
        )        
   }

  ngOnInit() {
    
  }

  searchService(data){
    console.log("http://localhost:3000/api/services/searchInput/"+data);
    return this.httpClient.get("http://localhost:3000/api/services/searchInput/"+data)
    .subscribe(
      (data:any[]) => {
        // console.log(data);
        this.serviceInfo = data;
        console.log(this.serviceInfo);
      }
    )
  }

  searchServiceByCategory(data){
    console.log(data);
  }

  getServicesByUser(){
    console.log("here");
    return this.httpClient.get('http://localhost:3000/api/service/getByUser/'+this.userId)
    .subscribe(
      (data:any[]) => {
        console.log(data);
        this.userServices = data;
      }
    )
  }

  getHiddenServices(){

  }

  getWishlistItems(){

  }

  addItemsToWishlist(){

  }

  addService(){

  }

  changeEmail(){
    return this.httpClient.get("http://localhost:3000/api/users/changeEmail/"+this.userId+"/"+this.emailId)
    .subscribe(
      (data:any[]) => {
        console.log(data);
      }
    )
  }

  changePhoneNo(){
    return this.httpClient.get("http://localhost:3000/api/users/changePhoneNo/"+this.userId+"/"+this.phoneNo)
    .subscribe(
      (data:any[]) => {
        console.log(data);
      }
    )
  }

  changeAddress(){
    return this.httpClient.get("http://localhost:3000/api/users/changeAddress/"+this.userId+"/"+this.address+"/"+this.city+"/"+this.state+"/"+this.country+"/"+this.zipcode)
    .subscribe(
      (data:any[]) => {
        console.log(data);
      }
    )
  }
}
