import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllInterfacesDetailsComponent } from './all-interfaces-details/all-interfaces-details.component';
import { ApiConfigurationComponent } from './api-configuration/api-configuration.component';
import { AppConfigurationComponent } from './app-configuration/app-configuration.component';
import { BusinessUnitComponent } from './business-unit/business-unit.component';
import { DataComponent } from './data/data.component';
import { HomeConfigComponent } from './home-config/home-config.component';
import { HomeComponent } from './home/home.component';
import { MappingDefinitionComponent } from './mapping-definition/mapping-definition.component';
import { MappingComponent } from './mapping/mapping.component';
import { NewInterfaceComponent } from './new-interface/new-interface.component';
import { SympDbComponent } from './symp-db/symp-db.component';


const routes: Routes = [
  {path:"",redirectTo:"home",pathMatch:"full"},
  {path:"data",component: DataComponent},
  {path:"mapping",component: MappingComponent},
  {path:"sympdb",component: SympDbComponent},
  {path:"home",component: HomeComponent},
  {path:"BU",component:BusinessUnitComponent},
  {path:"ApiConfig",component:ApiConfigurationComponent},
  {path:"APPConfig",component:AppConfigurationComponent},
  {path:"MappingDefinition",component:MappingDefinitionComponent},
  {path:"homeConfig",component:HomeConfigComponent},
  {path:"NewInterface",component:NewInterfaceComponent},
  {path:"allInterfacesDetails",component:AllInterfacesDetailsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
