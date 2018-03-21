import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';

const SECRET = '6Lcu300UAAAAADXqIdLw3ZDaI-Ri6nvEO8V_F40j';

@Injectable()
export class CaptchaService {

  constructor(private http: Http) { }

  verify(response: string) {
    let params = new URLSearchParams();
    params.append('secret', SECRET);
    params.append('response', response);

    return this.http.post('https://www.google.com/recaptcha/api/siteverify', params).map(res => res.json());
  }

}
