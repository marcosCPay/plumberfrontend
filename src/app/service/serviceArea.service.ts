import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ServiceArea } from '../models/serviceArea';
@Injectable({
    providedIn: 'root'
})
export class ServiceAreaService {
    headers = new Headers()
    API_URI = '/api/serviceArea';

    constructor(public http: HttpClient) {

        //this.headers.append("Authorization", "Bearer " + localStorage.getItem("token"))
    }

    getServiceAreas() {
        return this.http.get(`${this.API_URI}`);
    }

    
}
