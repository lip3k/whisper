import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CaptchaService} from '../services/captcha.service';
import {Whisper} from '../models/whisper.model';
import {ApiService} from '../services/api.service';

const TEN_MINUTES = 10 * 60 * 1000;


@Component({
  selector: 'app-whisper-composer',
  templateUrl: './whisper-composer.component.html',
  styleUrls: ['./whisper-composer.component.css']
})
export class WhisperComposerComponent implements OnInit {

  @Output() onNewWhisper = new EventEmitter<object>();

  recentlyWhispered: boolean;
  timeUntilNextWhisper: number;
  whisperSubmitted: boolean;

  minAuthorLength = 4;
  maxAuthorLength = 26;

  minWhisperLength = 10;
  maxWhisperLength = 120;

  whisper: Whisper;
  captchaVerified: boolean;

  constructor(private captcha: CaptchaService, private api: ApiService) {
    this.captchaVerified = false;
    this.whisper = new Whisper('', '');

    let lastWhisperTime = localStorage.getItem('lastWhisperTime');
    this.recentlyWhispered = false;
    if (lastWhisperTime) {
      this.recentlyWhispered = new Date(parseInt(lastWhisperTime, 10)).getTime() > (Date.now() - TEN_MINUTES);
      if (this.recentlyWhispered) {
        let timeLeft = ((new Date(parseInt(lastWhisperTime, 10)).getTime() + TEN_MINUTES) - Date.now()) / (1000 * 60);
        this.timeUntilNextWhisper = Math.floor(timeLeft);
      }
      console.log(this.recentlyWhispered, lastWhisperTime);
    }
  }

  ngOnInit() {}

  verifyCaptcha(captchaResponse: string) {
    this.captcha.verify(captchaResponse).subscribe(res => {
      this.captchaVerified = res.success;
    });
  }

  validateFields(): boolean {
    if (this.whisper.text.length < this.minWhisperLength) {
      return false;
    }

    if (this.whisper.author.length < this.minAuthorLength) {
      return false;
    }

    if (!this.captchaVerified) {
      return false;
    }

    return true;
  }

  submitWhisper() {
    this.api.addWhisper(this.whisper).subscribe(res => {
      this.onNewWhisper.emit(this.whisper);
      localStorage.setItem('lastWhisperTime', Date.now().toString());
      this.whisperSubmitted = true;
    });
  }

}
