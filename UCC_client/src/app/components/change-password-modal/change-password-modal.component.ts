import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user-services/user.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ModalService } from '../modal/modal.service';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html'
})
export class ChangePasswordModalComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private modalService: ModalService
  ) {
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    });
  }

  changePassword() {
    if (this.form.invalid || this.form.value.password !== this.form.value.confirmPassword) {
      this.toastr.error(
        this.translate.instant('password.mismatch'),
        this.translate.instant('password.error')
      );
      return;
    }

    this.userService.changePassword(this.form.value.password).subscribe({
      next: () => {
        this.toastr.success(
          this.translate.instant('password.changed'),
          this.translate.instant('password.success')
        );
        this.modalService.close();
      },
      error: () => {
        this.toastr.error(
          this.translate.instant('password.failed'),
          this.translate.instant('password.error')
        );
      }
    });
  }

  close() {
    this.modalService.close();
  }
}
