import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'form-access',
  standalone: true,
  imports: [InputTextModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './form-access.component.html',
  styleUrl: './form-access.component.css',
})
export class FormAccessComponent {
  protected formSubmitted: boolean = false;
  protected form: FormGroup = this.fb.group({
    currentPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router
  ) {}

  protected get currentPasswordControl(): FormControl {
    return this.form.get('currentPassword') as FormControl;
  }

  protected get newPasswordControl(): FormControl {
    return this.form.get('newPassword') as FormControl;
  }

  protected get confirmPasswordControl(): FormControl {
    return this.form.get('confirmPassword') as FormControl;
  }

  protected onSubmit(): void {
    this.formSubmitted = true;
    if (this.form.valid) {
      const user = this.form.value;
      const { uuid } = this.authService.getAuthUser();
      this.userService.updatePassword(uuid, user).subscribe({
        next: () => {
          this.logout();
          this.messageService.add({
            summary: 'FEITO',
            severity: 'success',
            detail: 'Senha alterada.',
          });
        },
        error: () => {
          this.messageService.add({
            summary: 'ERRO',
            severity: 'error',
            detail: 'Algo deu errado.',
          });
        },
      });
    }
  }

  private logout(): void {
    setTimeout(() => {
      this.authService.logout();
      this.router.navigate(['/auth/login']);
    }, 2000);
  }
}
