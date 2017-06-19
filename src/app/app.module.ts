import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CompaniesTreeComponent } from './companies-tree/companies-tree.component';
import { CompaniesTableComponent } from './companies-table/companies-table.component';

import { TreeModule } from 'angular-tree-component';

import { CompanyService } from './services/company.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CompaniesTreeComponent,
    CompaniesTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TreeModule
  ],
  providers: [CompanyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
