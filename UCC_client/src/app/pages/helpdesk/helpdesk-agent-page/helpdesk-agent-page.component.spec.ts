import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpdeskAgentPageComponent } from './helpdesk-agent-page.component';

describe('HelpdeskAgentPageComponent', () => {
  let component: HelpdeskAgentPageComponent;
  let fixture: ComponentFixture<HelpdeskAgentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelpdeskAgentPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpdeskAgentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
