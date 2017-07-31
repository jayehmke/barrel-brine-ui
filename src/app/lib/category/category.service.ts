import { Injectable } from '@angular/core';
// import { Http, Response }          from '@angular/http';
import { HttpService } from '../http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Category } from './category';

@Injectable()

export class CategoryService {
  private categoryUrl = `${API_URL}category/list`;  // URL to web API
  constructor(private http: HttpService) {
  }

  public getData(): Observable<[Category]> {
    const params = {};
    return this.http.get(this.categoryUrl, params)
      .map(this.http.extractData)
      .catch(this.http.handleError);
  }

  public getWithProducts(): Observable<[Category]> {
    const params = {};
    return this.http.get(`${this.categoryUrl}/products`, params)
      .map(this.http.extractData)
      .catch(this.http.handleError);
  }

  public getCategory(id: string): Observable<Category> {
    return this.http.get(`${this.categoryUrl}${id}/`, null)
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
