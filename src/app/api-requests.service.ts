import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  headers: HttpHeaders = new HttpHeaders({
    'Authorization': 'Basic ' + btoa(this.apiKey + ':' + this.apiSecret) //basic authentication header to get authorized into the api
  });

  constructor(private http: HttpClient) {

  }

  getHandwritings() { // HTTP request to get all the handwriting styles
    return this.http.get(this.apiURL + 'handwritings', { headers: this.headers });
  }

  renderImage(inputData: any) { // HTTP request to generate an image
    return this.http.get(this.apiURL + 'render/png', { 
      headers: this.headers,
      params: { //parameters requested by the API
        text: inputData.text,
        handwriting_id: inputData.handwriting,
        handwriting_size: inputData.fontSize+"px", 
        handwriting_color: inputData.color
      },
      responseType:'blob' //once the API return a JPG image, we need to define the response here as blob
    });
  }
}
