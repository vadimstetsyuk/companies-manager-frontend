import { Component, OnInit } from '@angular/core';
import { Company } from '../models/Company';
import { CompanyService } from '../services/company.service';

@Component({
    selector: 'companies-table',
    templateUrl: './companies-table.component.html',
    styleUrls: ['companies-table.component.scss']
})

export class CompaniesTableComponent implements OnInit {
    companies: Company[];
    tableData: Company[];
    paginated: Company[];

    itemsPerPage: number = 5;

    constructor(private _companyService: CompanyService) {
        this.tableData = [];
        this.paginated = [];
    }

    ngOnInit() {
        this.getCompanies();
    }

    /*
    *   Get companies from service
    */
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

    /*
    * Convert data to row format for displaying at the table
    */
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

    /*
    * Deviding companies to itemPerPage
    */
    paginateCompanies(page: number) {
        let low = page * this.itemsPerPage - this.itemsPerPage;
        let high = page * this.itemsPerPage;

        this.paginated = this.tableData.filter(company => {
            return this.tableData.indexOf(company) >= low && this.tableData.indexOf(company) < high;
        });
    }
}