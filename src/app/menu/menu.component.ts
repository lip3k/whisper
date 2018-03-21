import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Output() onChangeView = new EventEmitter<boolean>();
  inComposeView: boolean;

  constructor() { }

  ngOnInit() {
  }

  setComposeView() {
    this.inComposeView = true;
    this.onChangeView.emit(this.inComposeView);
  }

  setBrowseView() {
    this.inComposeView = false;
    this.onChangeView.emit(this.inComposeView);
  }

}
