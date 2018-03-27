import {Component, EventEmitter, OnInit, Output, Renderer} from '@angular/core';
import {CaptchaService} from '../_services/captcha.service';
import {Whisper} from '../_models/whisper.model';
import {ApiService} from '../_services/api.service';

const TEN_MINUTES = 10 * 60 * 1000;


@Component({
  selector: 'app-whisper-composer',
  templateUrl: './whisper-composer.component.html',
  styleUrls: ['./whisper-composer.component.scss']
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

  constructor(private captcha: CaptchaService, private api: ApiService, private renderer: Renderer) {
    this.captchaVerified = false;
    this.whisper = new Whisper('', '');

    const lastWhisperTime = localStorage.getItem('lastWhisperTime');
    this.recentlyWhispered = false;

    if (lastWhisperTime) {
      this.recentlyWhispered = new Date(parseInt(lastWhisperTime, 10)).getTime() > (Date.now() - TEN_MINUTES);
      if (this.recentlyWhispered) {
        const timeLeft = ((new Date(parseInt(lastWhisperTime, 10)).getTime() + TEN_MINUTES) - Date.now()) / (1000 * 60);
        this.timeUntilNextWhisper = Math.floor(timeLeft);
      }
    }
    //
    // //todo: debug
    // this.captchaVerified = true;
  }

  ngOnInit() {}

  verifyCaptcha(captchaResponse: string) {
    this.captcha.verify(captchaResponse).subscribe(res => {
      this.captchaVerified = res.success;
      console.log(res.success);
    });
  }

  validateFields(): boolean {
    if (this.whisper.text.length < this.minWhisperLength) {
      return false;
    }

    if (!this.captchaVerified) {
      return false;
    }
    return true;

  }

  submitWhisper() {
    this.api.addWhisper(this.whisper).subscribe(res => {
      localStorage.setItem('lastWhisperTime', Date.now().toString());
      this.saveVoteToStorage(res._id);
      this.onNewWhisper.emit(res);
    });
  }

  saveVoteToStorage(id) {
    console.log('save id to storage', id);
    localStorage.setItem(id, 'true');
  }
}
