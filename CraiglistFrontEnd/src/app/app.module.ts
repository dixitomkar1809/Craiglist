import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';
import { StorageServiceModule } from 'angular-webstorage-service';
import { PagerService } from './_services/index';
import { ServiceComponent } from './service/service.component';


const appRoutes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'service', component: ServiceComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    IndexComponent,
    ServiceComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    StorageServiceModule,
    ReactiveFormsModule
  ],
  providers: [
    PagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
