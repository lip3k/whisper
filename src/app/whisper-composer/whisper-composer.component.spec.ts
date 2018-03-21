import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhisperComposerComponent } from './whisper-composer.component';

describe('WhisperComposerComponent', () => {
  let component: WhisperComposerComponent;
  let fixture: ComponentFixture<WhisperComposerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhisperComposerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhisperComposerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
