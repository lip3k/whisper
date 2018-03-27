import {Component, EventEmitter, Input, OnInit, Output, Renderer} from '@angular/core';
import {Whisper} from '../_models/whisper.model';
import {ApiService} from '../_services/api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-whisper-card',
  templateUrl: './whisper-card.component.html',
  styleUrls: ['./whisper-card.component.scss']
})
export class WhisperCardComponent implements OnInit {

  @Input() index;
  @Input() data: Whisper;
  @Output() onLove = new EventEmitter<object>();

  visible: boolean;
  ratingVisible: boolean;
  textVisible: boolean;
  metaVisible: boolean;

  constructor(private api: ApiService, private renderer: Renderer) {
  }

  ngOnInit() {
    this.data.voted = this.checkStorageIfVoted();
    setTimeout(() => {
      this.visible = true;
    }, this.index * 50);
    setTimeout(() => {
      this.ratingVisible = true;
    }, (this.index * 50) + 150);
    setTimeout(() => {
      this.textVisible = true;
    }, (this.index * 50) + 250);
    setTimeout(() => {
      this.metaVisible = true;
    }, (this.index * 50) + 350);
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

  getDisplayDate(timestamp: number) {
    return moment(timestamp).format('DD/MM/YYYY');
  }

  markVoted() {
    this.data.voted = true;
    this.data.rating += 1;
  }

}
