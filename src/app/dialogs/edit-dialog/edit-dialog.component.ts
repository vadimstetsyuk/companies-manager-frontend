import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';

import { Company } from '../../models/Company';

@Component({
  selector: 'edit-company-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['../dialogs.scss']
})
export class EditCompanyComponent implements OnInit {
  @ViewChild('editDialog') public editDialog: ModalDirective;
  @Input() companies: Company[];
  currentCompany: Company;
  selectedParentCompany: String;
  isIndependent: boolean;

  /* Validation */
  public typeaheadLoading: boolean;
  public typeaheadNoResults: boolean;

  constructor() {
    this.currentCompany = <Company>{};
    this.selectedParentCompany = '';
    this.isIndependent = false;
  }

  ngOnInit() {
  }

  show(company: Company) {
    this.currentCompany = company;

    /* Filling parent company field in form */
    if(this.currentCompany.parentId == 0) {
      this.selectedParentCompany = '';
      this.isIndependent = true;
    } else {
      this.selectedParentCompany = this.companies.filter(company => {
        return this.currentCompany.parentId == company.id;
      })[0].name;
      this.isIndependent = false;
    }

    this.editDialog.show();
  }

  hide() {
    this.editDialog.hide();
  }


  /* Validation */
  public changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  public changeTypeaheadNoResults(e: boolean): void {
    this.typeaheadNoResults = e;
  }
}