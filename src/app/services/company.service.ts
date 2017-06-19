import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Company } from '../models/Company';

@Injectable()
export class CompanyService {

    constructor(private http: Http) {
    }

    getCompanies(): Observable<Company[]> {
        // let url = 'http://localhost:3000/api/companies';
        let url = 'assets/companies.json';
        

        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}