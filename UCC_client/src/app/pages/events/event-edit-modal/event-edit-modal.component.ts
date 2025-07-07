import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventService } from '../../../services/event-services/event.service';
import { ModalService } from '../../../components/modal/modal.service';
import { Event } from '../../../interfaces/event.model';

@Component({
  selector: 'app-event-edit-modal',
  templateUrl: './event-edit-modal.component.html'
})
export class EventEditModalComponent implements OnInit {
  @Input() event!: Event;
  @Output() closeModal = new EventEmitter<void>();

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      description: [this.event?.description || '']
    });
  }

  editEvent(): void {
    if (this.form.valid && this.event) {
      this.eventService.updateEvent(this.event.id, this.form.value).subscribe(() => {
        this.close();
      });
    }
  }

  close(): void {
    this.modalService.close();
    this.closeModal.emit();
  }
}
