import { Injectable } from '@angular/core';
// import { Http, Response }          from '@angular/http';
import { HttpService } from '../http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Product } from './product';

@Injectable()

export class InstagramService {
  private igUrl = `${API_URL}instagram/list`;  // URL to web API
  constructor(private http: HttpService) {
  }

  public getData(): Observable<[any]> {
    const params = {};
    return this.http.get(this.igUrl, params)
      .map(this.http.extractData)
      .catch(this.http.handleError);
  }

}
