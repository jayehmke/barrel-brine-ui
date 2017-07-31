import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, Response }  from '@angular/http';

@Injectable()
export class HttpService {

  private headers = new Headers();

  constructor(private http: Http) {
    this.createAuthorizationHeader(this.headers);
  }

  public get(url, params) {
    const getUrl = params ? `${url}?${this.getParams(params)}` : url;
    return this.http.get(getUrl, {
      headers: this.headers
    });
  }

  public post(url, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, data, {
      headers
    });
  }

  public delete(url) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.delete(url, {
      headers
    });
  }

  public extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  public handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  private getParams(params: any) {
    const paramArray = Object.keys(params).map((key) => {
      if (params[key]) {
        return key + '=' + params[key];
      }
    });

    return paramArray.filter((n) => n).join('&').replace(/(^,)|(,$)/g, "");
  }

  private createAuthorizationHeader(headers: Headers) {
    // headers.append('Access-Control-Allow-Headers', 'x-xsrf-token')
    // headers.append('Authorization', 'Token ' +
    //   'c776c1c18c5226906eedcd60dbbb3589ed1eb9c4');
  }

  // Token c776c1c18c5226906eedcd60dbbb3589ed1eb9c4
}
