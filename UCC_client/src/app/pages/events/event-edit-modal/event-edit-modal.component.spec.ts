import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventEditModalComponent } from './event-edit-modal.component';

describe('EventEditModalComponent', () => {
  let component: EventEditModalComponent;
  let fixture: ComponentFixture<EventEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventEditModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
