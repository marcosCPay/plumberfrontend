import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Plumber } from '../models/plumber';
@Injectable({
    providedIn: 'root'
})
export class PlumberService {
    headers = new Headers()
    API_URI = '/api/plumber';

    constructor(public http: HttpClient) {

        //this.headers.append("Authorization", "Bearer " + localStorage.getItem("token"))
    }

    getJobs() {
        return this.http.get(`${this.API_URI}/job/list`);
    }

    createPlumber(plumber:Plumber) {
        return this.http.post(`${this.API_URI}/create`,plumber);
    }




    
}
