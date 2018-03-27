import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { ReCaptchaModule } from 'angular2-recaptcha';

import { AppComponent } from './app.component';
import { ApiService } from './_services/api.service';

import { WhisperCardComponent } from './whisper-card/whisper-card.component';
import { WhisperComposerComponent } from './whisper-composer/whisper-composer.component';
import {CaptchaService} from './_services/captcha.service';
import {FormsModule} from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { MenuBtnComponent } from './menu/menu-btn/menu-btn.component';
import { ToastComponent } from './toast/toast.component';
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [
    AppComponent,
    WhisperCardComponent,
    WhisperComposerComponent,
    MenuComponent,
    MenuBtnComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpModule,
    ReCaptchaModule
  ],
  providers: [ApiService, CaptchaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
