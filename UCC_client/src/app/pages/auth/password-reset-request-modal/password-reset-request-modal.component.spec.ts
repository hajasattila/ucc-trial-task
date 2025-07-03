import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetRequestModalComponent } from './password-reset-request-modal.component';

describe('PasswordResetRequestModalComponent', () => {
  let component: PasswordResetRequestModalComponent;
  let fixture: ComponentFixture<PasswordResetRequestModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasswordResetRequestModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordResetRequestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
