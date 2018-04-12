import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public fullName: string = "Omkar Dixit"
  public address: string = "7825, Mccallum Blvd, Apt 402";
  public city: string  = "Dallas";
  public state: string = "Texas";
  public country: string = "USA";
  public phoneNo: string = "6824149338";
  public emailId: string = "ond170030@utdallas.edu";
  private searchServiceByInput: string = "http://localhost:3000/api/services/searchInput/so";
  public refCount = 1;
  data:any = {};

  public searchString: string;
  constructor(private httpClient: HttpClient) {
    this.searchString = "";
   }

  ngOnInit() {
    console.log("ngoninit")
  }

  searchService(data){
    console.log("http://localhost:3000/api/services/searchInput/"+data);
    return this.httpClient.get("http://localhost:3000/api/services/searchInput/"+data)
    .subscribe(
      (data:any[]) => {
        console.log(data)
      }
    )
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
