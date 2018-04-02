import {Component, Input, OnInit, Renderer} from '@angular/core';
import {ApiService} from './_services/api.service';
import {Whisper} from './_models/whisper.model';
import {Toast} from './_models/toast.model';

const LIMIT = 5;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  toasts: Toast[] = [];

  whispers: Whisper[] = [];
  activeView: string;

  apiLoadIndex = 0;
  moreToLoad: boolean;

  themes = [
    'yellow-red',
    'green-purple',
    'dark-pink',
    'silver-red'
  ];
  activeTheme: string;

  constructor(private apiService: ApiService, private renderer: Renderer) {}

  ngOnInit() {
    this.loadTheme();
    this.getNewWhispers();
    this.showThemeTip();
  }

  getNewWhispers(index: number = 0) {
    this.apiService.getNewWhispers(index).subscribe(res => {
      this.moreToLoad = res.length === LIMIT;
      this.whispers = this.whispers.concat(res.sort());
    });
  }

  getBestWhispers(index: number = 0) {
    this.apiService.getBestWhispers(index).subscribe(res => {
      this.moreToLoad = res.length === LIMIT;
      this.whispers = this.whispers.concat(res.sort());
    });
  }

  loadWhispersForView(viewName: string) {
    switch(viewName) {
      case 'New':
        this.getNewWhispers(this.apiLoadIndex);
        break;
      case 'Top':
        this.getBestWhispers(this.apiLoadIndex);
        break;
    }
  }

  loadMoreWhispers() {
    this.apiLoadIndex += 1;
    this.loadWhispersForView(this.activeView);
  }

  newWhisper(whisper) {
    this.addToast('Success', true);
    this.handleViewChange('New');
  }

  handleViewChange(viewName: string) {
    this.activeView = null;

    setTimeout(() => {
      this.activeView = viewName;
      this.whispers = [];
      this.apiLoadIndex = 0;
      this.loadWhispersForView(viewName);
      window.scroll(0, 0);
    }, 400);
  }

  randomTheme(event = null) {
    let randomNumber = Math.floor(Math.random() * this.themes.length);
    let newTheme = this.themes[randomNumber];
    if (newTheme === this.activeTheme) {
      this.randomTheme(event);
      return;
    }
    this.activeTheme = newTheme;
    this.saveTheme();

    if (event) {
      this.renderer.setElementClass(event.target, 'tada', true);
      setTimeout(() => {
        this.renderer.setElementClass(event.target, 'tada', false);
      }, 500);
    }
  }

  saveTheme() {
    localStorage.setItem('theme', this.activeTheme);
  }

  loadTheme() {
    let theme = localStorage.getItem('theme');
      this.activeTheme = theme ? theme : 'silver-red';
  }

  addToast(text: string, success: boolean) {
    this.toasts = [new Toast(text, success)].concat(this.toasts);
  }

  removeToast(text) {
    setTimeout(() => {
      this.toasts = this.toasts.filter(toast => {
        return toast.text !== text;
      });
    }, 750);
  }

  showThemeTip() {
    if (localStorage.getItem('tipGiven')) {
      return;
    }

    setTimeout(() => {
      this.addToast('Tap on logo', true);
      localStorage.setItem('tipGiven', 'true');
    }, 2000);
  }
}
