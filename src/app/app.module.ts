import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CompaniesTreeComponent } from './companies-tree/companies-tree.component';
import { CompaniesTableComponent } from './companies-table/companies-table.component';

import { AddCompanyComponent } from './dialogs/add-dialog/add-dialog.component';
import { EditCompanyComponent } from './dialogs/edit-dialog/edit-dialog.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TreeModule } from 'angular-tree-component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { CompanyService } from './services/company.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CompaniesTreeComponent,
    CompaniesTableComponent,
    AddCompanyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TreeModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    TypeaheadModule.forRoot()
  ],
  entryComponents: [AddCompanyComponent, EditCompanyComponent],
  providers: [CompanyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
