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
            .catch(this.handleError);
    }

    getCompanyById(_id: Number): Observable<Company> {
        // let url = 'http://localhost:3000/api/companies/' + _id;
        let url = 'assets/companies.json';

        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    addCompany(_company: Company): Observable<Company> {
        let body = JSON.stringify(_company);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = 'http://localhost:3000/api/companies';

        return this.http.post(url, body, options)
            .map(res => <Company>res.json())
            .catch(this.handleError);
    }

    editCompany(_company: Company): Observable<Company> {
        let body = JSON.stringify(_company);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = 'http://localhost:3000/api/companies/' + _company.id;

        return this.http.put(url, body, options)
            .map(res => <Company>res.json())
            .catch(this.handleError);
    }

    deleteCompany(_id: Number): Observable<Company> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = 'http://localhost:3000/api/companies/' + _id;

        return this.http.delete(url, options)
            .map(res => <Company>res.json())
            .catch(this.handleError);
    }

    private handleError(err: any): Observable<string> {
        let message: string;
        if (err.message) {
            message = err.message;
        } else {
            message = (err.status) ?
                `${err.status} : ${err.statusText}` :
                'Server connection error';
        }

        console.error(message);
        return Observable.throw(message);
    }
}