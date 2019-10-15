import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  public allCountries;
  private url = 'https://restcountries.eu/rest/v2';

  constructor(public http: HttpClient) { }


  // request for getting all regions starts...
  getAllRegions(): any {
    let myResponse = this.http.get(`${this.url}/all?fields=region`);
    return myResponse;
  } // request for getting all regions ends...


  // request for getting all countries of a region starts...
  getAllCountries(region): any {
    let myResponse = this.http.get(`${this.url}/region/` + region);
    console.log(myResponse);
    return myResponse;
  } // request for getting all countries of a region ends...


  // request for getting countries according to the language starts...
  getLanguageWiseCountries(language): any {
    let myResponse = this.http.get(`${this.url}/lang/` + language);
    return myResponse;
  } // request for getting countries according to the language ends...


  // request for getting countries according to the currency starts...
  getCurrencyWiseCountries(currency): any {
    let myResponse = this.http.get(`${this.url}/currency/` + currency)
    return myResponse;
  }// request for getting countries according to the currency ends...


  // request for getting single country info starts...
  getCountryInfo(name): any {
    let myResponse = this.http.get(`${this.url}/name/` + name + `?fullText=true`)
    console.log(myResponse);
    return myResponse;
  }// request for getting single country info ends...


  // error handling method starts...
  private handleError(err: HttpErrorResponse) {
    console.log("handle error Http calls");
    console.log(err.message);
    return Observable.throw(err.message);
  } // error handling method ends...

}
