import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Event} from '../../../interfaces/event.model';
import {EventService} from '../../../services/event-services/event.service';
import {ModalService} from '../../../components/modal/modal.service';

@Component({
  selector: 'app-event-list-page',
  templateUrl: './event-list-page.component.html'
})
export class EventListPageComponent implements OnInit {
  events$!: Observable<Event[]>;

  constructor(
    private eventService: EventService,
    protected modalService: ModalService,
  ) {
  }

  ngOnInit(): void {
    this.events$ = this.eventService.events$;
    this.eventService.refreshEvents();
  }

  openCreateModal(): void {
    this.modalService.open('event-create');
  }

  onEventCreated(): void {
    this.eventService.refreshEvents();
  }
}
