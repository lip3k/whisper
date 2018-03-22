import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import {Whisper} from './models/whisper.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  whispers: Whisper[];

  activeView: string;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getWhispers();
  }

  getWhispers() {
    this.apiService.getWhispers().subscribe(res => {
      this.whispers = res.reverse();
    });
  }

  handleViewChange(viewName: string) {
    this.activeView = viewName;
  }
}
