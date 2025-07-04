import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user-services/user.service';

@Component({
  selector: 'app-password-reset-page',
  templateUrl: './password-reset-page.component.html',
})
export class PasswordResetPageComponent {
  form: FormGroup;
  submitted = false;
  success: boolean | null = null;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.form = this.fb.group({
      code: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirmation: ['', Validators.required],
    });
  }

  submit() {
    this.submitted = true;
    if (this.form.invalid) return;

    const { code, password, passwordConfirmation } = this.form.value;

    if (password !== passwordConfirmation) {
      this.success = false;
      return;
    }

    // this.userService.resetPassword({ code, password, passwordConfirmation }).subscribe({
    //   next: () => (this.success = true),
    //   error: () => (this.success = false),
    // });
  }
}
