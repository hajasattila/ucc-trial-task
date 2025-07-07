import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Event } from '../../interfaces/event.model';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalComponentName = new BehaviorSubject<string | null>(null);
  modal$ = this.modalComponentName.asObservable();

  private _selectedEvent = new BehaviorSubject<Event | null>(null);
  selectedEvent$ = this._selectedEvent.asObservable();

  open(componentName: string, event?: Event) {
    this.modalComponentName.next(componentName);
    if (event) this._selectedEvent.next(event);
  }

  close() {
    this.modalComponentName.next(null);
    this._selectedEvent.next(null);
  }

  setSelectedEvent(event: Event | null) {
    this._selectedEvent.next(event);
  }
}
