import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-menu-btn',
  templateUrl: './menu-btn.component.html',
  styleUrls: ['./menu-btn.component.scss']
})
export class MenuBtnComponent implements OnInit {

  @Input() icon: string;
  @Input() text: string;
  @Input() isActive: boolean;
  @Output() onButtonClicked = new EventEmitter<object>();

  constructor() {
  }

  ngOnInit() {
  }

  click() {
    this.isActive = true;
    this.onButtonClicked.emit(null);
  }

}
