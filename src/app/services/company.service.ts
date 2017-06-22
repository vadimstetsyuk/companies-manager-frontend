import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Company } from '../models/Company';
import { _SERVER} from './config';

@Injectable()
export class CompanyService {

    constructor(private _http: Http) {
    }

    /*
    *   Get all companies from server as tree structure
    */
    getCompanies(): Observable<Company[]> {
        // let url = _SERVER + 'companies';
        let url = 'assets/companies.json';


        return this._http.get(url)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    /*
    *   Get company from server as one element without children
    */
    getCompanyById(id: Number): Observable<Company> {
        let url = _SERVER + 'companies/' + id;

        return this._http.get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    /*
    *   Add company to server
    */
    addCompany(company: Company): Observable<Company> {
        let body = JSON.stringify(company);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = _SERVER + 'companies';

        return this._http.post(url, body, options)
            .map(res => <Company>res.json())
            .catch(this.handleError);
    }

    /*
    *   Edit company
    */
    editCompany(company: Company): Observable<Company> {
        let body = JSON.stringify(company);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = _SERVER + 'companies/' + company.id;

        return this._http.put(url, body, options)
            .map(res => <Company>res.json())
            .catch(this.handleError);
    }

    /*
    *   Delete company
    */
    deleteCompany(id: Number): Observable<Company> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = _SERVER + 'companies/' + id;

        return this._http.delete(url, options)
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