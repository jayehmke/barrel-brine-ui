import { Injectable } from '@angular/core';
// import { Http, Response }          from '@angular/http';
import { HttpService } from '../http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Banner } from './banner';

@Injectable()

export class BannerService {
  private bannerUrl = `${API_URL}banner/list`;  // URL to web API
  constructor(private http: HttpService) {
  }

  public getData(): Observable<[any]> {
    const params = {};
    return this.http.get(this.bannerUrl, params)
      .map(this.http.extractData)
      .catch(this.http.handleError);
  }

}
