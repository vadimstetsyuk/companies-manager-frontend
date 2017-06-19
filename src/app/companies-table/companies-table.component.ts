import { Component, OnInit } from '@angular/core';
import { Company } from '../models/Company';
import { CompanyService } from '../services/company.service';

@Component({
    selector: 'companies-table',
    templateUrl: './companies-table.component.html'
})

export class CompaniesTableComponent implements OnInit {
    companies: Company[];
    tableData: Company[];

    constructor(private _companyService: CompanyService) {
        this.tableData = [];
    }

    ngOnInit() {
        this.getCompanies();
    }

    getCompanies() {
        this._companyService.getCompanies()
            .subscribe((companies) => {
                this.companies = companies;
                this.convertDataForTable(companies);
            },
            err => {
                console.log(err);
            });
    }

    convertDataForTable(companies: Company[]) {
        if (companies == []) {
            return;
        }

        companies.forEach(company => {
            this.tableData.push(company);
            if (company.children != []) {
                this.convertDataForTable(company.children);
            } else {
                return;
            }
        });
        return;
    }
}