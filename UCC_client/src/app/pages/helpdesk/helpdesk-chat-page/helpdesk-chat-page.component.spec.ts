import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpdeskChatPageComponent } from './helpdesk-chat-page.component';

describe('HelpdeskChatPageComponent', () => {
  let component: HelpdeskChatPageComponent;
  let fixture: ComponentFixture<HelpdeskChatPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelpdeskChatPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpdeskChatPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
