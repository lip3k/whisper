import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { Whisper } from '../_models/whisper.model';

import { environment } from '../../environments/environment';

@Injectable()
export class ApiService {


  constructor(private http: Http) { }

  getNewWhispers(index: number = 0) {
    return this.http.get(`${environment.db}/new_whispers/${index}`).map(res => res.json());
  }

  getBestWhispers(index: number = 0) {
    return this.http.get(`${environment.db}/best_whispers/${index}`).map(res => res.json());
  }

  getAllWhispers(index: number) {
    return this.http.get(`${environment.db}/all_whispers`).map(res => res.json());
  }

  addWhisper(whisper: Whisper) {
    let params = new URLSearchParams();
    params.append('text', whisper.text);
    params.append('author', whisper.author);

    return this.http.post(`${environment.db}/new_whisper`, params).map(res => res.json());
  }

  giveLove(whisper: Whisper) {
    return this.http.get(`${environment.db}/give_love/${whisper._id}`).map(res => res.json());
  }



}
