import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataComponent } from './data/data.component';
import { HttpClientModule } from '@angular/common/http';
import { MappingComponent } from './mapping/mapping.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { SympDbComponent } from './symp-db/symp-db.component';
import { HomeComponent } from './home/home.component';
import { BusinessUnitComponent } from './business-unit/business-unit.component';
import { ApiConfigurationComponent } from './api-configuration/api-configuration.component';
import { AppConfigurationComponent } from './app-configuration/app-configuration.component';
import { MappingDefinitionComponent } from './mapping-definition/mapping-definition.component';
import { HomeConfigComponent } from './home-config/home-config.component';
import { AllInterfacesComponent } from './all-interfaces/all-interfaces.component';
import { NewInterfaceComponent } from './new-interface/new-interface.component';
import { AllInterfacesDetailsComponent } from './all-interfaces-details/all-interfaces-details.component';
@NgModule({
  declarations: [
    AppComponent,
    DataComponent,
    MappingComponent,
    NavbarComponent,
    SympDbComponent,
    HomeComponent,
    BusinessUnitComponent,
    ApiConfigurationComponent,
    AppConfigurationComponent,
    MappingDefinitionComponent,
    HomeConfigComponent,
    AllInterfacesComponent,
    NewInterfaceComponent,
    AllInterfacesDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
