import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'modal-user-create',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, DialogModule],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css',
})
export class ModalUserCreateComponent {
  constructor(private fb: FormBuilder) {}
  @Input()
  visible: boolean = false;
  @Output()
  visibleChange = new EventEmitter<boolean>();

  formUserCreateSubmitted: boolean = false;
  formUserCreate = this.fb.group(this.getUserFormGroup());

  onSubmit(): void {
    this.formUserCreateSubmitted = true;
    if (this.formUserCreate.valid) console.log(this.formUserCreate.value);
  }

  closeModal(visible: boolean): void {
    this.visible = visible;
    this.visibleChange.emit(visible);
    this.initializeForm();
  }

  private initializeForm(): void {
    this.formUserCreateSubmitted = false;
    this.formUserCreate = this.fb.group(this.getUserFormGroup());
  }

  private getUserFormGroup() {
    return {
      name: ['', [Validators.required, Validators.maxLength(120)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      role: ['', [Validators.required]],
      phoneNumber: [''],
    };
  }
}
