import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Event} from '../../../interfaces/event.model';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {
  @Input() event!: Event;
  @Output() edit = new EventEmitter<Event>();
  @Output() delete = new EventEmitter<Event>();
}
