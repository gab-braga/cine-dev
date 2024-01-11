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

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    InputTextModule,
    InputMaskModule,
    ButtonModule,
    CheckboxModule,
    ReactiveFormsModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  fieldTermsAndPolicies = new FormControl(false);
  signupFormSubmitted: boolean = false;
  signupForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    cpf: [
      '',
      [Validators.required, Validators.minLength(14), Validators.maxLength(14)],
    ],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}

  onSubmit(): void {
    this.signupFormSubmitted = true;
    if (this.acceptedTermsAndPolicies() && this.signupForm.valid) {
      console.log(this.signupForm.value);
    }
  }

  protected acceptedTermsAndPolicies(): boolean {
    return !!this.fieldTermsAndPolicies.value;
  }
}
