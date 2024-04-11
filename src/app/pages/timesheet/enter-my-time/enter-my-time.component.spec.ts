import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterMyTimeComponent } from './enter-my-time.component';

describe('EnterMyTimeComponent', () => {
  let component: EnterMyTimeComponent;
  let fixture: ComponentFixture<EnterMyTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterMyTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnterMyTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
