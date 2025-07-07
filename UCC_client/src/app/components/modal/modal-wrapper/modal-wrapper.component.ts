import {Component, Output, EventEmitter} from '@angular/core';
import {ModalService} from '../modal.service';

@Component({
  selector: 'app-modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
})
export class ModalWrapperComponent {
  currentModal$ = this.modalService.modal$;
  selectedEvent$ = this.modalService.selectedEvent$;

  @Output() created = new EventEmitter<any>();

  constructor(private modalService: ModalService) {}

  closeModal() {
    this.modalService.close();
  }

  stopPropagation(event: MouseEvent) {
    event.stopPropagation();
  }

  onEventCreated(event: any) {
    this.created.emit(event);
    this.closeModal();
  }
}
