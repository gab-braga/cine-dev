import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputMaskModule } from 'primeng/inputmask';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    InputTextModule,
    InputMaskModule,
    ButtonModule,
    RouterLink,
    CheckboxModule,
    ReactiveFormsModule,
    ToastModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  protected fieldTermsAndPolicies = new FormControl(false);
  protected signupFormSubmitted: boolean = false;
  protected signupForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    cpf: ['', [Validators.required, Validators.maxLength(14)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  protected get nameControl(): FormControl {
    return this.signupForm.get('name') as FormControl;
  }

  protected get cpfControl(): FormControl {
    return this.signupForm.get('cpf') as FormControl;
  }

  protected get emailControl(): FormControl {
    return this.signupForm.get('email') as FormControl;
  }

  protected get passwordControl(): FormControl {
    return this.signupForm.get('password') as FormControl;
  }

  protected onSubmit(): void {
    this.signupFormSubmitted = true;
    if (this.acceptedTermsAndPolicies() && this.signupForm.valid) {
      const user = this.signupForm.value;
      if (user.cpf) user.cpf = user.cpf.replace(/[^\d]/g, '');
      this.authService.signup(user).subscribe({
        next: () => {
          this.router.navigate(['/auth/login']);
        },
        error: ({ error }) => {
          this.messageService.add({
            severity: 'error',
            summary: 'ERRO',
            detail: error.message,
          });
        },
      });
    }
  }

  protected acceptedTermsAndPolicies(): boolean {
    return !!this.fieldTermsAndPolicies.value;
  }
}
