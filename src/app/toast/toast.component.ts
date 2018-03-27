import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer, ViewChild} from '@angular/core';
import {Toast} from '../_models/toast.model';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  @ViewChild('toast') toast: ElementRef;
  @Input() data: Toast;
  @Output() onToastExit = new EventEmitter<string>();

  constructor(private renderer: Renderer) { }

  ngOnInit() {
    this.scheduleExit();
  }

  scheduleExit() {
    setTimeout(() => {
      console.log(this.toast);
      this.renderer.setElementClass(this.toast.nativeElement, 'bounceOut', true);
      this.onToastExit.emit(this.data.text);
    }, 3000);
  }

}
