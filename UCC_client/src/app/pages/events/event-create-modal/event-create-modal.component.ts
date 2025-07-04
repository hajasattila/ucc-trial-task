import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-event-create-modal',
  templateUrl: './event-create-modal.component.html'
})
export class EventCreateModalComponent implements OnInit {
  form!: FormGroup;

  @Output() closeModal = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      occurrence: ['', Validators.required],
      description: ['']
    });
  }

  createEvent(): void {
    if (this.form.valid) {
    }
  }

  close(): void {
    this.closeModal.emit();
  }
}
