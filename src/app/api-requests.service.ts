import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiRequestsService {
  //Required keys to make request from the API, they work like username and password (api_key as username and api_secret as password)
  apiKey: string = '8SQQKNZAH9QY2VSK';
  apiSecret: string = 'C370FAGCH25YCRS0';

  //API's URL
  apiURL: string = 'https://api.handwriting.io/';

  httpOptions: any = {
    headers: new HttpHeaders({
      'Authorization': 'Basic ' + btoa(this.apiKey + ':' + this.apiSecret)
    })
  };

  constructor(private http: HttpClient) {

  }

  getHandwritings(): any {
    return this.http.get(this.apiURL + 'handwritings', this.httpOptions);
  }
}
