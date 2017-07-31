import { Injectable } from '@angular/core';
// import { Http, Response }          from '@angular/http';
import { HttpService } from '../http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Location } from './location';

@Injectable()

export class LocationService {
  private locationUrl = `${API_URL}location/list`;  // URL to web API
  constructor(private http: HttpService) {
  }

  public getData(params: any): Observable<[Location]> {

    return this.http.get(this.locationUrl, params)
      .map(this.http.extractData)
      .catch(this.http.handleError);
  }

  public getLocation(id: string): Observable<Location> {
    return this.http.get(`${this.locationUrl}${id}/`, null)
      .map(this.http.extractData)
      .catch(this.http.handleError);
  }

  // public deleteOrder(id: string) {
  //   return this.http.delete(`${this.orderUrl}/${id}/`)
  //     .map(this.extractData)
  //     .catch(this.handleError);
  // }

  // private extractOrders(res: Response) {
  //   let body = res.json();
  //   let carts = body.results;
  //   return carts || {};
  // }

  // private extractData(res: Response) {
  //   let body = res.json();
  //   return body || {};
  // }

}
