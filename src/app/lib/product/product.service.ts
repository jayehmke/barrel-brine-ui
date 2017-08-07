import { Injectable } from '@angular/core';
// import { Http, Response }          from '@angular/http';
import { HttpService } from '../http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Product } from './product';

@Injectable()

export class ProductService {
  private bannerUrl = `${API_URL}product/list`;  // URL to web API
  constructor(private http: HttpService) {
  }

  public getData(): Observable<[any]> {
    const params = {};
    return this.http.get(this.bannerUrl, params)
      .map(this.http.extractData)
      .catch(this.http.handleError);
  }

}
