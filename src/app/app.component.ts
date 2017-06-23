import { Component, OnInit } from '@angular/core';
import { Company } from './models/Company';
import { CompanyService } from './services/company.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  companies: Company[];
  hasChanged: boolean;

  constructor(private _companyService: CompanyService) {
    this.hasChanged = false;
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

  refreshCompanies() {
    this.getCompanies();
    this.hasChanged = !this.hasChanged;
  }
}
