import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../../services/event-services/event.service';
import { UserService } from '../../../services/user-services/user.service';
import { ModalService } from '../../../components/modal/modal.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

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
    private modalService: ModalService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      occurrence: ['', Validators.required],
      description: ['']
    });
  }

  createEvent(): void {
    if (this.form.invalid || !this.userService.user) {
      const missing: string[] = [];
      if (this.form.get('title')?.invalid) missing.push(this.translate.instant('events.title'));
      if (this.form.get('occurrence')?.invalid) missing.push(this.translate.instant('events.occurrence'));

      this.toastr.error(
        this.translate.instant('events.missingFields', { fields: missing.join(', ') }),
        this.translate.instant('events.errorTitle')
      );
      return;
    }

    const dto = {
      ...this.form.value,
      user: this.userService.user.id
    };

    this.eventService.createEvent(dto).subscribe({
      next: (newEvent) => {
        this.toastr.success(
          this.translate.instant('events.createSuccess'),
          this.translate.instant('events.successTitle')
        );
        this.eventCreated.emit(newEvent);
        this.close();
      },
      error: () => {
        this.toastr.error(
          this.translate.instant('events.createFailed'),
          this.translate.instant('events.errorTitle')
        );
      }
    });
  }

  close(): void {
    this.modalService.close();
    this.closeModal.emit();
  }
}
