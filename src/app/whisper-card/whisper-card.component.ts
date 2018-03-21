import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Whisper} from '../models/whisper.model';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-whisper-card',
  templateUrl: './whisper-card.component.html',
  styleUrls: ['./whisper-card.component.css']
})
export class WhisperCardComponent implements OnInit {

  @Input() data: Whisper;
  @Output() onLove = new EventEmitter<object>();

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  giveLove() {
    if (this.data.voted) {
      return;
    }
    this.api.giveLove(this.data).subscribe(res => {
      console.log(res);
    });
  }

}
