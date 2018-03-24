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

  constructor(private api: ApiService, private renderer: Renderer) {
  }

  ngOnInit() {
    this.data.voted = this.checkStorageIfVoted();
  }

  giveLove(event) {
    if (this.data.voted) {
      this.applyAnimation(event, 'jello');
      return;
    }
      this.applyAnimation(event, 'tada');
    this.api.giveLove(this.data).subscribe(res => {
      this.markVoted();
      this.saveVoteToStorage();
      this.onLove.emit(null);
    });
  }

  saveVoteToStorage() {
    localStorage.setItem(this.data._id, 'true');
  }

  checkStorageIfVoted() {
    return localStorage.getItem(this.data._id) !== null;
  }

  applyAnimation(event: any, animation: string) {
    this.renderer.setElementClass(event.target, animation, true);
  }

  markVoted() {
    this.data.voted = true;
    this.data.rating += 1;
  }

}
