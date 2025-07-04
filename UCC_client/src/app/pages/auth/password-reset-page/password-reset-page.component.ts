import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user-services/user.service';

@Component({
  selector: 'app-password-reset-page',
  templateUrl: './password-reset-page.component.html'
})
export class PasswordResetPageComponent implements OnInit {
  form: FormGroup;
  code: string = '';
  submitted = false;
  success: boolean | null = null;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirmation: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.code = this.route.snapshot.queryParamMap.get('code') || '';
  }

  submit() {
    this.submitted = true;
    if (this.form.invalid) return;

    //   const {password, passwordConfirmation} = this.form.value;
    //   this.userService.resetPassword({
    //     code: this.code,
    //     password,
    //     passwordConfirmation,
    //   }).subscribe({
    //     next: () => {
    //       this.success = true;
    //       console.log('🔐 Sikeres jelszó visszaállítás!');
    //     },
    //     error: (err) => {
    //       this.success = false;
    //       console.error('❌ Sikertelen jelszó visszaállítás:', err);
    //     },
    //   });
    // }
  }
}
