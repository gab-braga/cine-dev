import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../../../../components/header/header.component';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    HeaderComponent,
    ButtonModule,
    InputTextModule,
    FileUploadModule,
    ReactiveFormsModule,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  formUserCreateSubmitted: boolean = false;
  formUserCreate = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    cpf: ['', [Validators.required]],
    role: ['', [Validators.required]],
    phoneNumber: [''],
  });

  constructor(private fb: FormBuilder) {}

  onUpload(files: any): void {
    const file = files.files[0];
    if (file) console.log(file);
    else console.log('empty');
  }

  onSubmit(): void {
    this.formUserCreateSubmitted = true;
    if (this.formUserCreate.valid) {
      console.log(this.formUserCreate.value);
    }
  }
}
