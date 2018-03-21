import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import {Whisper} from './models/whisper.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  whispers: Whisper[];

  showComposer: boolean;

  constructor(private apiService: ApiService) {
    this.showComposer = false;
  }

  ngOnInit() {
    this.getWhispers();
  }

  getWhispers() {
    this.apiService.getWhispers().subscribe(res => {
      this.whispers = res.reverse();
    });
  }

  handleViewChange(inComposerView) {
    this.showComposer = inComposerView;
  }
}
