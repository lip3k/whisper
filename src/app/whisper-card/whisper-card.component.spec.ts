import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhisperCardComponent } from './whisper-card.component';

describe('WhisperCardComponent', () => {
  let component: WhisperCardComponent;
  let fixture: ComponentFixture<WhisperCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhisperCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhisperCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
