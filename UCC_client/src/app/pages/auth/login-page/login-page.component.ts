import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user-services/user.service';
import { ModalService } from '../../../components/modal/modal.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private modalService: ModalService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      identifier: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      console.log(credentials);

      this.userService.login(credentials).subscribe({
        next: (res: { jwt: string; user: any }) => {
          this.userService.loginWithToken(res.jwt);
          this.translate.get('login.success').subscribe((msg) =>
            this.toastr.success(msg)
          );
          console.log(res);
          this.router.navigate(['/events']);
        },
        error: (err: any) => {
          this.translate.get('login.failed').subscribe((msg) =>
            this.toastr.error(msg)
          );
          console.error(err);
        },
      });
    } else {
      console.warn(this.loginForm.errors);
    }
  }

  openPasswordResetModal() {
    this.modalService.open('password-reset-request');
  }
}
