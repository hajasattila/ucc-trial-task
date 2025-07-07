import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Event } from '../../../interfaces/event.model';
import { EventService } from '../../../services/event-services/event.service';
import {ModalService} from "../../modal/modal.service";

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {
  @Input() event!: Event;
  @Output() deleted = new EventEmitter<void>();
  @Output() edited = new EventEmitter<void>();

  showDeleteConfirm = false;

  constructor(
    private eventService: EventService,
    private modalService: ModalService
  ) {}

  openEditModal() {
    this.modalService.open('event-edit', this.event);
  }

  confirmDelete() {
    this.showDeleteConfirm = true;
  }

  cancelDelete() {
    this.showDeleteConfirm = false;
  }

  deleteEventConfirmed() {
    this.eventService.deleteEvent(this.event.id).subscribe({
      next: () => {
        this.deleted.emit();
        this.showDeleteConfirm = false;
      },
      error: (err) => console.error('Törlés hiba:', err)
    });
  }
}
