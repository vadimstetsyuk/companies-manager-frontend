import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';

import { Company } from '../../models/Company';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'edit-company-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['../dialogs.scss']
})
export class EditCompanyComponent {
  @ViewChild('editDialog') public editDialog: ModalDirective;
  @Input() companies: Company[];
  @Output() onHideModal = new EventEmitter();
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
    this.tableData = [];
    this.currentCompany = <Company>{};
    this.selectedParentCompany = '';
    this.isIndependent = false;
  }

  /* Show update company dialog */
  show(company: Company) {
    this.init();
    this.currentCompany = company;

    /* Filling parent company field in form */
    if (this.currentCompany.parentId == 0) {
      this.selectedParentCompany = '';
      this.isIndependent = true;
    } else {
      this.selectedParentCompany = this.companies.filter(company => {
        return this.currentCompany.parentId == company.id;
      })[0].name;
      this.isIndependent = false;
    }

    this.getCompanies();

    this.editDialog.show();
  }

  /* Hide add company dialog */
  hide() {
    this.editDialog.hide();
    this.onHideModal.emit();
    this.editDialog.ngOnDestroy();
  }

  getCompanies() {
    this._companyService.getCompanies()
      .subscribe(
      companies => {
        this.companies = companies;
        this.tableData = [];
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
  * Send to server updated company
  */
  public updateCompany() {
    let hasParent = false;  // Defining if company has any parent or independent company

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

    this._companyService.editCompany(this.currentCompany)
      .subscribe((data) => {
        this.currentCompany = data;
        this.hide();
      });
  }
}