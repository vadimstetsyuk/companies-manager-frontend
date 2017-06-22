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
    paginated: Company[];

    itemOnPage: number = 9;

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

                if (this.companies) {
                    this.convertDataForTable(companies);
                    this.paginateCompanies(1);
                }
            },
            err => {
                // console.log(err);
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

    paginateCompanies(page: number) {
        let low = page * this.itemOnPage - this.itemOnPage;
        let high = page * this.itemOnPage;

        this.paginated = this.tableData.filter(company => {
            return this.tableData.indexOf(company) >= low && this.tableData.indexOf(company) < high;
        });
    }
}