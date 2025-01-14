import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Company } from '../models/company';
@Injectable({
    providedIn: 'root'
})
export class CompanyService {
    headers = new Headers()
    API_URI = '/api/company';

    constructor(public http: HttpClient) {

        //this.headers.append("Authorization", "Bearer " + localStorage.getItem("token"))
    }

    getJobs() {
        return this.http.get(`${this.API_URI}/job/list`);
    }

    createCompany(company:Company) {
        return this.http.post(`${this.API_URI}/create`,company);
    }




    
}
