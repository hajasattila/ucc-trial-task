import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Event } from '../../../interfaces/event.model';
import { EventService } from '../../../services/event-services/event.service';
import {ModalService} from "../../../components/modal/modal.service";

@Component({
  selector: 'app-event-edit-modal',
  templateUrl: './event-edit-modal.component.html'
})
export class EventEditModalComponent {
  @Input() event!: Event;
  @Output() closeModal = new EventEmitter<void>();

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private modalService: ModalService
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      occurrence: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.form.patchValue({
      title: this.event.title,
      occurrence: this.event.occurrence,
      description: this.event.description
    });
  }

  save(): void {
    if (this.form.invalid) return;

    this.eventService.updateEvent(this.event.id, this.form.value).subscribe({
      next: () => {
        this.closeModal.emit();
        this.modalService.close();
      },
      error: err => console.error('Hiba mentéskor:', err)
    });
  }

  cancel(): void {
    this.closeModal.emit();
    this.modalService.close();
  }
}
