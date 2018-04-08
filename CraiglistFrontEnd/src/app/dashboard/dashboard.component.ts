import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public fullName = "Omkar Dixit"
  public address = "7825, Mccallum Blvd, Apt 402";
  public city  = "Dallas";
  public state = "Texas";
  public country = "USA";
  public phoneNo = "6824149338";
  public emailId = "ond170030@utdallas.edu";
  
  constructor() { }

  ngOnInit() {
    console.log(this.fullName);
  }

  searchService(data){
    console.log(data);
  }

  searchServiceByCategory(data){
    console.log(data);
  }

  changeEmail(data){
    console.log(data);
  }

  changePhoneNo(data){
    console.log(data);
  }

  changeAddress(data1, data2, data3, data4){
    console.log(data1, data2, data3, data4);
  }

}
