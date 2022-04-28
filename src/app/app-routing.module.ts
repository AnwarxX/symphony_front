import { Injectable, NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterModule, Routes, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AllInterfacesDetailsComponent } from './all-interfaces-details/all-interfaces-details.component';
import { AppConfigurationComponent } from './app-configuration/app-configuration.component';
import { BusinessUnitComponent } from './business-unit/business-unit.component';
import { DataComponent } from './data/data.component';
import { HomeConfigComponent } from './home-config/home-config.component';
import { HomeComponent } from './home/home.component';
import { LicenseComponent } from './license/license.component';
import { MappingDetailComponent } from './mapping-detail/mapping-detail.component';
import { MappingViewComponent } from './mapping-view/mapping-view.component';
import { MappingComponent } from './mapping/mapping.component';
import { NewInterfaceComponent } from './API-INTERFACE/new-interface.component';
import { SunInterfaceComponent } from './sun-interface/sun-interface.component';
import { CapsInterfaceComponent } from './CAPS-INTERFACE/caps-interface.component';

import { SympDbComponent } from './symp-db/symp-db.component';
import * as cryptoJS from 'crypto-js';
import { APIsService } from "./services/apis.service";
import { AboutComponent } from './about/about.component';
import { StatusViewComponent } from './status-view/status-view.component';
@Injectable()
export class alwaysAuthGuard implements CanActivate{
  // data:any
  // async getLicense(){
  //   //send a get request to the backend to retrive all the data in this endpoit
  //   await this.apiService.getFun('getLisence').subscribe(
  //     response => {
  //       this.data = response;//response variable holds all the data retrived then asign them to a variable cold data
  //       //loop that iterates over the objects in the data and returns only the table name then push it in an array called tableNames
  

  //       if(this.data == null || this.data=="" || this.data == "please uplode license"){
  //         this.router.navigate(['/License']);

  //       }
  //       else{
  //         let tokn =  localStorage.getItem('token');

  //         if(tokn == null || tokn ==""){
  //         localStorage.setItem('token',this.data);
  //         }
  //         this.router.navigate(['/home']);

  //       }
  //     }
  //   )
  // }
  constructor(public router:Router,public apiService:APIsService){
  }
  
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
   try {
    let tok =  localStorage.getItem('token');
    if(tok==null|| tok==""){
      this.apiService.getFun('stop').subscribe(data => {})
      this.apiService.getFun('stopSun').subscribe(data => {})
      this.router.navigate(['/License']);
      return false;
    }
  
    var bytes  = cryptoJS.AES.decrypt(tok||"", 'lamiaa');
    var originalText = bytes.toString(cryptoJS.enc.Utf8);
    let x=JSON.parse(originalText)
    
    var date1 = new Date();
    var date2 = new Date(x[0].EndDate);

    if(date1.getTime() > date2.getTime()){
      let tok =  localStorage.setItem('token',"");
      this.apiService.postFun('stop',"").subscribe(data => {})
      this.apiService.postFun('stopSun',"").subscribe(data => {})
      this.router.navigate(['/License']);

      return false;
    }
    for (let i = 0; i < x[0].product.length; i++) {
      if (route.routeConfig?.path?.includes(x[0].product[i])||route.routeConfig?.path=="home") {

        return true;
      }
    }
    
    return false;
  } catch (error) {
     
    this.apiService.getFun('stop').subscribe(data => {})
    this.apiService.getFun('stopSun').subscribe(data => {})
    this.router.navigate(['/License']);
    return false;
  }
  }
}
const routes: Routes = [
  {path:"",redirectTo:"home",pathMatch:"full"},
  {path:"data",component: DataComponent,canActivate:[alwaysAuthGuard]},
  {path:"Symphonymapping",component: MappingComponent,canActivate:[alwaysAuthGuard]},
  {path:"Symphonysympdb",component: SympDbComponent,canActivate:[alwaysAuthGuard]},
  {path:"home",component: HomeComponent,canActivate:[alwaysAuthGuard]},
  {path:"SymphonyBU",component:BusinessUnitComponent,canActivate:[alwaysAuthGuard]},
  {path:"SymphonyAPPConfig",component:AppConfigurationComponent,canActivate:[alwaysAuthGuard]},
  {path:"SymphonyhomeConfig",component:HomeConfigComponent,canActivate:[alwaysAuthGuard]},
  {path:"SymphonyNewInterface",component:NewInterfaceComponent,canActivate:[alwaysAuthGuard]},
  {path:"SunNewInterface",component:SunInterfaceComponent,canActivate:[alwaysAuthGuard]},
  {path:"SymphonyCapsNewInterface",component:CapsInterfaceComponent,canActivate:[alwaysAuthGuard]},

  {path:"SymphonyallInterfacesDetails",component:AllInterfacesDetailsComponent,canActivate:[alwaysAuthGuard]},
  {path:"SymphonyMappingDetails",component:MappingDetailComponent,canActivate:[alwaysAuthGuard]},
  {path:"SymphonyMappingView",component:MappingViewComponent,canActivate:[alwaysAuthGuard]},
  {path:"SymphonyStatusView",component:StatusViewComponent,canActivate:[alwaysAuthGuard]},
  {path:"License",component:LicenseComponent},
  {path:"About",component:AboutComponent},
  {path: '**', component: HomeComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
