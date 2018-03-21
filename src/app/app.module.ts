import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { ReCaptchaModule } from 'angular2-recaptcha';

import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';

import { WhisperCardComponent } from './whisper-card/whisper-card.component';
import { WhisperComposerComponent } from './whisper-composer/whisper-composer.component';
import {CaptchaService} from './services/captcha.service';
import {FormsModule} from '@angular/forms';
import { MenuComponent } from './menu/menu.component';


@NgModule({
  declarations: [
    AppComponent,
    WhisperCardComponent,
    WhisperComposerComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReCaptchaModule
  ],
  providers: [ApiService, CaptchaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
