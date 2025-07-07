import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Event } from '../../../interfaces/event.model';
import { EventService } from '../../../services/event-services/event.service';
import { ModalService } from '../../../components/modal/modal.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {
  @Input() event!: Event;
  @Output() deleted = new EventEmitter<void>();
  @Output() edited = new EventEmitter<void>();

  constructor(
    private eventService: EventService,
    private modalService: ModalService
  ) {}

  deleteEvent() {
    if (confirm('Biztosan törlöd ezt az eseményt?')) {
      this.eventService.deleteEvent(this.event.id).subscribe({
        next: () => this.deleted.emit(),
        error: (err) => console.error('Törlés hiba:', err)
      });
    }
  }

  openEditModal() {
    this.modalService.open('event-edit', this.event);
  }
}
