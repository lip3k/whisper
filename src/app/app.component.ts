import {Component, Input, OnInit, Renderer} from '@angular/core';
import {ApiService} from './services/api.service';
import {Whisper} from './models/whisper.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  whispers: Whisper[];
  activeView: string;

  themes = [
    'yellow-red',
    'green-purple',
    'dark-pink',
    'silver-red'
  ];
  activeTheme: string;

  constructor(private apiService: ApiService, private renderer: Renderer) {

  }

  ngOnInit() {
    this.activeTheme = 'silver-red';
    this.getWhispers();
  }

  getWhispers() {
    this.apiService.getWhispers().subscribe(res => {
      this.whispers = res.reverse();
    });
  }

  newWhisper(whisper) {
    this.activeView = 'Browse';
    whisper.rating = 1;
    whisper.voted = true;
    this.whispers = [whisper].concat(this.whispers);
  }

  handleViewChange(viewName: string) {
    this.activeView = null;
    setTimeout(() => {
      this.activeView = viewName;
    }, 1000);
  }

  sortByRating(whispers: Whisper[]) {
    return whispers.slice().sort((a, b) => {
      if (a.rating < b.rating) {
        return 1;
      }

      if (a.rating > b.rating) {
        return -1;
      }

      return 0;
    });
  }

  randomTheme(event = null) {
    let randomNumber = Math.floor(Math.random() * this.themes.length);
    let newTheme = this.themes[randomNumber];
    if (newTheme === this.activeTheme) {
      this.randomTheme(event);
      return;
    }
    this.activeTheme = newTheme;
    if (event) {
      this.renderer.setElementClass(event.target, 'tada', true);
      setTimeout(() => {
        this.renderer.setElementClass(event.target, 'tada', false);
      }, 500);
    }
  }
}
