import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Event } from '../../../interfaces/event.model';

@Component({
  selector: 'app-event-edit-modal',
  templateUrl: './event-edit-modal.component.html'
})
export class EventEditModalComponent implements OnInit {
  @Input() event!: Event;
  @Output() closeModal = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      description: [this.event.description || '']
    });
  }

  editEvent(): void {
    if (this.form.valid) {
      // emit data or call service
    }
  }

  close(): void {
    this.closeModal.emit();
  }
}
