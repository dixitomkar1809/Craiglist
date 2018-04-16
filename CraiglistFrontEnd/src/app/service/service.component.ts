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

  private serviceId: string;
  private serviceInfo: any[];
  private serviceImages: any[];

  constructor(private httpClient: HttpClient) { 
    // this.userId = JSON.parse(sessionStorage.getItem('user')).userId;
    this.serviceId = JSON.parse(sessionStorage.getItem('service')).serviceId;
    console.log(this.serviceId);
    this.httpClient.get('http://localhost:3000/api/service/'+this.serviceId)
    .subscribe(
      (data:any[]) => {
        console.log(data[0]);
        this.serviceInfo = data[0];
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

}
