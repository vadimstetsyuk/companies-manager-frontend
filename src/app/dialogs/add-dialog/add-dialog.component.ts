import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';

import { Company } from '../../models/Company';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'add-company-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['../dialogs.scss']
})
export class AddCompanyComponent implements OnInit {
  @ViewChild('addDialog') public addDialog: ModalDirective;
  companies: Company[];
  currentCompany: Company;
  selectedParentCompany: String;
  isIndependent: boolean;

  /* Validation */
  public typeaheadLoading: boolean;
  public typeaheadNoResults: boolean;

  constructor(private _companyService: CompanyService) {
    this.companies = [];
    this.currentCompany = new Company(0, 0, '', 0, 0, []);
    this.isIndependent = true;
  }

  ngOnInit() {
    this.getCompanies();
  }

  /* Show add company dialog */
  show() {
    this.addDialog.show();
  }

  /* Hide add company dialog */
  hide() {
    this.addDialog.hide();
  }

  getCompanies() {
    this._companyService.getCompanies()
      .subscribe(
      companies => this.companies = companies,
      err => {
        // console.log(err);
      });
  }

  /* Validation */
  public changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  public changeTypeaheadNoResults(e: boolean): void {
    this.typeaheadNoResults = e;
  }
}