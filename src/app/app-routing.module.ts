import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterModule, Routes, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
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
import { NewInterfaceComponent } from './new-interface/new-interface.component';
import { SympDbComponent } from './symp-db/symp-db.component';

export class alwaysAuthGuard implements CanActivate{
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let x=["NewInterface","mapping"]
    for (let i = 0; i < x.length; i++) {
      if (route.routeConfig?.path==x[i]) {
        return false;
      }
    }
    return true;
  }
}
const routes: Routes = [
  {path:"",redirectTo:"home",pathMatch:"full"},
  {path:"data",component: DataComponent,canActivate:[alwaysAuthGuard]},
  {path:"mapping",component: MappingComponent,canActivate:[alwaysAuthGuard]},
  {path:"sympdb",component: SympDbComponent,canActivate:[alwaysAuthGuard]},
  {path:"home",component: HomeComponent,canActivate:[alwaysAuthGuard]},
  {path:"BU",component:BusinessUnitComponent,canActivate:[alwaysAuthGuard]},
  {path:"APPConfig",component:AppConfigurationComponent,canActivate:[alwaysAuthGuard]},
  {path:"homeConfig",component:HomeConfigComponent,canActivate:[alwaysAuthGuard]},
  {path:"NewInterface",component:NewInterfaceComponent,canActivate:[alwaysAuthGuard]},
  {path:"allInterfacesDetails",component:AllInterfacesDetailsComponent,canActivate:[alwaysAuthGuard]},
  {path:"MappingDetails",component:MappingDetailComponent,canActivate:[alwaysAuthGuard]},
  {path:"MappingView",component:MappingViewComponent,canActivate:[alwaysAuthGuard]},
  {path:"License",component:LicenseComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
