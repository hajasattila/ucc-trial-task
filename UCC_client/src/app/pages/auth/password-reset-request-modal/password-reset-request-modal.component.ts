import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

import {UserService} from '../../../services/user-services/user.service';
import {ModalService} from "../../../components/modal/modal.service";

@Component({
  selector: 'app-password-reset-request-modal',
  templateUrl: './password-reset-request-modal.component.html',
})
export class PasswordResetRequestModalComponent {
  form: FormGroup;
  submitted = false;
  success: boolean | null = null;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modalService: ModalService,
    private userService: UserService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  submit() {
    this.submitted = true;
    if (this.form.invalid) return;

    const {email} = this.form.value;
    this.userService.requestPasswordReset(email).subscribe({
      next: (resp) => {
        this.success = true;
        this.toastr.success(`Sikeres jelszó-visszaállítási e-mail küldés: ${email}`, 'Email elküldve');
      },
      error: (err) => {
        this.success = false;
        this.toastr.error(`Nem sikerült elküldeni az emailt: ${email}`, 'Hiba történt');
        console.error('❌ Email küldés sikertelen:', err);
      },
    });
  }

  close() {
    this.modalService.close();
  }
}
