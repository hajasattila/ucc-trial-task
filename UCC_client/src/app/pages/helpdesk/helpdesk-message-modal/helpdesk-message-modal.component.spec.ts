import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpdeskMessageModalComponent } from './helpdesk-message-modal.component';

describe('HelpdeskMessageModalComponent', () => {
  let component: HelpdeskMessageModalComponent;
  let fixture: ComponentFixture<HelpdeskMessageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelpdeskMessageModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpdeskMessageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
