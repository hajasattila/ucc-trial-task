import {Component, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Event} from '../../../interfaces/event.model';
import {EventService} from '../../../services/event-services/event.service';
import {ModalService} from '../../../components/modal/modal.service';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-event-edit-modal',
  templateUrl: './event-edit-modal.component.html'
})
export class EventEditModalComponent implements OnChanges {
  @Input() event!: Event;
  @Output() closeModal = new EventEmitter<void>();

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private modalService: ModalService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      occurrence: ['', Validators.required],
      description: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['event'] && this.event) {
      this.form.patchValue({
        title: this.event.title,
        occurrence: this.formatDateTime(this.event.occurrence),
        description: this.event.description
      });
    }
  }

  save(): void {
    if (this.form.invalid) {
      const missing: string[] = [];
      if (this.form.get('title')?.invalid) missing.push(this.translate.instant('events.title'));
      if (this.form.get('occurrence')?.invalid) missing.push(this.translate.instant('events.occurrence'));

      this.toastr.error(
        this.translate.instant('events.missingFields', { fields: missing.join(', ') }),
        this.translate.instant('events.errorTitle')
      );
      return;
    }

    this.eventService.updateEvent(this.event.id, this.form.value).subscribe({
      next: () => {
        this.toastr.success(
          this.translate.instant('events.updateSuccess'),
          this.translate.instant('events.successTitle')
        );
        this.closeModal.emit();
        this.modalService.close();
      },
      error: err => {
        console.error('Hiba mentéskor:', err);
        this.toastr.error(
          this.translate.instant('events.updateFailed'),
          this.translate.instant('events.errorTitle')
        );
      }
    });
  }

  cancel(): void {
    this.closeModal.emit();
    this.modalService.close();
  }

  private formatDateTime(datetime: string): string {
    return datetime.slice(0, 16);
  }
}
