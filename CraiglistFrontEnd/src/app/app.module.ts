import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';
import { StorageServiceModule } from 'angular-webstorage-service';
import { PagerService } from './_services/index';


const appRoutes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'dashboard', component: DashboardComponent }];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    IndexComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    StorageServiceModule
  ],
  providers: [
    PagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
