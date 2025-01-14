import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Plumber } from '../models/plumber';
import { Company } from '../models/company';
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    headers = new Headers()
    API_URI = '/api/auth';

    constructor(public http: HttpClient) {

        //this.headers.append("Authorization", "Bearer " + localStorage.getItem("token"))
    }

    //Clients
    loginPlumber(plumber: Plumber) {
        return this.http.post(`${this.API_URI}/login/plumber`, plumber);
    }

    //Clients
    loginCompany(company: Company) {
        return this.http.post(`${this.API_URI}/login/company`, company);
    }
    
}
