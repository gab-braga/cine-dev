import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    FileUploadModule,
    ReactiveFormsModule,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  formUserCreate = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    cpf: ['', [Validators.required]],
    role: ['', [Validators.required]],
    phoneNumber: [''],
  });

  constructor(private fb: FormBuilder) {}

  onUpload(fiel: any): void {}

  onSubmit(): void {
    if (this.formUserCreate.valid) {
      console.log(this.formUserCreate.value);
    }
  }
}
