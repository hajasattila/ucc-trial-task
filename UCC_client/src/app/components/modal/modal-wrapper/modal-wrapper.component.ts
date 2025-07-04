import { Component } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
})
export class ModalWrapperComponent {
  currentModal$ = this.modalService.modal$;

  constructor(private modalService: ModalService) {}

  closeModal() {
    this.modalService.close();
  }

  stopPropagation(event: MouseEvent) {
    event.stopPropagation();
  }
}
