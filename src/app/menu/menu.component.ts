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
      text: 'New',
      icon: 'list',
      action: this.setBrowseView()
    },
    {
      text: 'Top',
      icon: 'star',
      action: this.setBrowseView()
    },
    {
      text: 'Add',
      icon: 'pencil',
      action: this.setComposeView()
    }
  ];

  constructor() {}

  ngOnInit() {
    this.setView('New');
  }

  setComposeView() {
    this.onChangeView.emit(null);
  }

  setBrowseView() {
    this.onChangeView.emit(null);
  }

  setView(viewName: string) {
    this.activeView = viewName;

    this.onChangeView.emit(this.activeView);
  }

  isActiveBtn(btnName: string) {
    return btnName === this.activeView;
  }

}
