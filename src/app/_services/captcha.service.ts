import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Http, Headers, URLSearchParams, RequestOptions} from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class CaptchaService {

  constructor(private http: Http) {
  }

  verify(response: string) {
    let params = new URLSearchParams();
    params.append('responseData', response);
    return this.http.post(`${environment.db}/verify`, params).map(res => res.json());
  }

}
