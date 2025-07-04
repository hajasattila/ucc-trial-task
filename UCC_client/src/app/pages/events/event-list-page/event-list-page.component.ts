import { Component } from '@angular/core';
import { Event } from '../../../interfaces/event.model';

@Component({
  selector: 'app-event-list-page',
  templateUrl: './event-list-page.component.html'
})
export class EventListPageComponent {
  events: Event[] = [];

  openCreateModal(): void {
    // open modal logic
  }

  openEditModal(event: Event): void {
    // open edit modal with event
  }

  confirmDelete(event: Event): void {
    // confirm and delete event
  }
}
