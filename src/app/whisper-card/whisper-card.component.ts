import {Component, EventEmitter, Input, OnInit, Output, Renderer} from '@angular/core';
import {Whisper} from '../models/whisper.model';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-whisper-card',
  templateUrl: './whisper-card.component.html',
  styleUrls: ['./whisper-card.component.scss']
})
export class WhisperCardComponent implements OnInit {

  @Input() data: Whisper;
  @Output() onLove = new EventEmitter<object>();

  constructor(private api: ApiService, private renderer: Renderer) { }

  ngOnInit() {
  }

  giveLove(event) {
    if (this.data.voted) {
      this.applyAnimation(event, 'jello');
      return;
    }
    this.api.giveLove(this.data).subscribe(res => {
      this.applyAnimation(event, 'tada');
      this.markVoted();
      this.onLove.emit(null);
    });
  }

  applyAnimation(event: any, animation: string) {
    this.renderer.setElementClass(event.target, animation, true);
    setTimeout(() => {
      this.renderer.setElementClass(event.target, animation, false);
    }, 1000);
  }

  markVoted() {
    this.data.voted = true;
    this.data.rating += 1;
  }

}
