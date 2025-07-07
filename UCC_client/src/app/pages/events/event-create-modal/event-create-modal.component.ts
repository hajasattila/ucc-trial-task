import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../../services/event-services/event.service';
import { UserService } from '../../../services/user-services/user.service';
import { ModalService } from '../../../components/modal/modal.service';

@Component({
  selector: 'app-event-create-modal',
  templateUrl: './event-create-modal.component.html'
})
export class EventCreateModalComponent implements OnInit {
  form!: FormGroup;
  @Output() closeModal = new EventEmitter<void>();
  @Output() eventCreated = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private userService: UserService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      occurrence: ['', Validators.required],
      description: ['']
    });
  }

  createEvent(): void {
    if (this.form.valid && this.userService.user) {
      const dto = {
        ...this.form.value,
        user: this.userService.user.id
      };
      this.eventService.createEvent(dto).subscribe((newEvent) => {
        this.eventCreated.emit(newEvent);
        this.close();
      });
    }
  }

  close(): void {
    this.modalService.close();
    this.closeModal.emit();
  }
}
