import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';

import { Company } from '../../models/Company';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'add-company-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['../dialogs.scss']
})
export class AddCompanyComponent {
  @ViewChild('addDialog') public addDialog: ModalDirective;
  @Output() onHideModal = new EventEmitter();
  companies: Company[];
  tableData: Company[];
  currentCompany: Company;
  selectedParentCompany: String;
  isIndependent: boolean;

  /* Validation */
  public typeaheadLoading: boolean;
  public typeaheadNoResults: boolean;

  constructor(private _companyService: CompanyService) {
    this.init();
  }

  init() {
    this.companies = [];
    this.tableData = [];
    this.currentCompany = new Company(0, 0, '', 0, 0, []);
    this.selectedParentCompany = '';
    this.isIndependent = true;  }

  /* Show add company dialog */
  show() {
    this.init();
    this.getCompanies();
    this.addDialog.show();
  }

  /* Hide add company dialog */
  hide() {
    this.addDialog.hide();
    this.onHideModal.emit();
    this.addDialog.ngOnDestroy();
  }

  /*
  * Get all companies from server
  */
  getCompanies() {
    this._companyService.getCompanies()
      .subscribe(
      companies => {
        this.companies = companies;
        this.convertDataForTable(this.companies);
      },
      err => {
        // console.log(err);
      });
  }

  /*
  * Convert data to row format for displaying at the table
  */
  convertDataForTable(companies: Company[]) {
    if (companies == []) {
      return;
    }

    companies.forEach(company => {
      this.tableData.push(company);
      if (company.child != []) {
        this.convertDataForTable(company.child);
      } else {
        return;
      }
    });
    return;
  }

  /* Validation */
  public changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  public changeTypeaheadNoResults(e: boolean): void {
    this.typeaheadNoResults = e;
  }

  /*
  * Send to server new company
  */
  public addCompany() {
    let hasParent = false; // Defining if company has any parent or independent company
    
    this.tableData.forEach(company => {
      if (company.name == this.selectedParentCompany) {
        hasParent = true;
      }
    });

    if (hasParent && !this.isIndependent) {
      this.currentCompany.parentId = this.tableData.filter((company) => {
        return company.name == this.selectedParentCompany;
      })[0].id;
    } else {
      this.currentCompany.parentId = 0;
    }

    this._companyService.addCompany(this.currentCompany)
      .subscribe((data) => {
        this.currentCompany = data;
        this.hide();
      });
  }
}