import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Output() onChangeView = new EventEmitter<string>();
  activeView: string;

  menuConfig = [
    {
      text: 'Compose',
      icon: 'pencil',
      action: this.setComposeView()
    },
    {
      text: 'Best',
      icon: 'star',
      action: this.setBrowseView()
    },
    {
      text: 'Browse',
      icon: 'list',
      action: this.setBrowseView()
    }
  ];

  constructor() {}

  ngOnInit() {
    this.setView('Browse');
  }

  setComposeView() {
    this.onChangeView.emit(null);
  }

  setBrowseView() {
    this.onChangeView.emit(null);
  }

  setView(viewName: string) {
    this.activeView = viewName;

    switch (viewName) {
      case 'Browse':
        this.setBrowseView();
        break;
      case 'Compose':
        this.setComposeView();
        break;
    }

    this.onChangeView.emit(this.activeView);
  }

  isActiveBtn(btnName: string) {
    return btnName === this.activeView;
  }

}
