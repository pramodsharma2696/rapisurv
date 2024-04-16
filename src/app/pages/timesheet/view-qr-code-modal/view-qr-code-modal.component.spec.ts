import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQrCodeModalComponent } from './view-qr-code-modal.component';

describe('ViewQrCodeModalComponent', () => {
  let component: ViewQrCodeModalComponent;
  let fixture: ComponentFixture<ViewQrCodeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewQrCodeModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewQrCodeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
