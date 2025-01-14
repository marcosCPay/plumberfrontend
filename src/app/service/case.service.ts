import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CaseService {
  headers = new HttpHeaders({
    'php-auth-pw': 'srvsEPjjicvYN5HkObBE6Zq9RjZvHKI4Sd488ilm6FNOUPqOimYNOLRg4MyJyTPdg3fQGIV33wBEbbMj9kzshXYwwholMaweNEVwfWOajs0UuaDnBFRIZbeHb2YCGydb3XtyIjVvt63G0OBWNnuT1J'
  });
  API_URL = 'https://cmpprd-aps-apc002.azurewebsites.net/public/recordsdetgetbycaseid';
  constructor(public http: HttpClient) {

  }
  getCase(caseId: string):Observable<any> {
    console.log("1212");
    
    return this.http.get(`${this.API_URL}?case_id=PDC23-007091`,{headers:this.headers});
  }
}
