import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';

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
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
