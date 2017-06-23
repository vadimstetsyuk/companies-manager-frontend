import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Company } from '../models/Company';
import { CompanyService } from '../services/company.service';

@Component({
    selector: 'companies-table',
    templateUrl: './companies-table.component.html',
    styleUrls: ['companies-table.component.scss']
})

export class CompaniesTableComponent implements OnChanges {
    @Input() companiesChanged: boolean;
    @Output() onChangeCompanies = new EventEmitter();
    companies: Company[];
    tableData: Company[];
    paginated: Company[];

    itemsPerPage: number = 5;

    constructor(private _companyService: CompanyService) {
        this.tableData = [];
    }

    ngOnChanges() {
        this.getCompanies();
    }

    /*
    * Call when companies was deleted, added or updated
    */
    onUpdateCompanies() {
        this.getCompanies();
        this.onChangeCompanies.emit();
    }

    /*
    *   Get companies from service
    */
    getCompanies() {
        this._companyService.getCompanies()
            .subscribe((companies) => {
                this.companies = companies;

                if (this.companies) {
                    this.tableData = [];
                    this.convertDataForTable(companies);
                    this.paginateCompanies(1);
                }
            },
            err => {
                // console.log(err);
            });
    }

    /*
    * Delete company
    */
    deleteCompany(company: Company) {   
        this._companyService.deleteCompany(company.id)
            .subscribe((result) => {
                this.getCompanies();

                this.onChangeCompanies.emit();          
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