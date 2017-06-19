import { Component, OnInit } from '@angular/core';
import { Company } from '../models/Company';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'companies-tree',
  templateUrl: './companies-tree.component.html'
})

export class CompaniesTreeComponent implements OnInit {
  companies: Company[];

  constructor(private _companyService: CompanyService) {

  }

  ngOnInit() {
    this.getCompanies();
  }

  getCompanies() {
    this._companyService.getCompanies()
      .subscribe(
      companies => this.companies = companies,
      err => {
        // console.log(err);
      });
  }
}