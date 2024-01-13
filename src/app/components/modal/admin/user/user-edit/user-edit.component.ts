import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'modal-user-edit',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, DialogModule],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css',
})
export class ModalUserEditComponent {
  constructor(private fb: FormBuilder) {}
  @Input()
  visible: boolean = false;
  @Output()
  visibleChange = new EventEmitter<boolean>();
  @Input({ required: true })
  user: any = null;

  formUserEditSubmitted: boolean = false;
  formUserEdit: FormGroup = this.fb.group(this.getUserFormGroup());

  onSubmit(): void {
    this.formUserEditSubmitted = true;
    if (this.formUserEdit.valid) console.log(this.formUserEdit.value);
  }

  closeModal(visible: boolean): void {
    this.visible = visible;
    this.visibleChange.emit(visible);
    this.initializeForm();
    if (!visible) this.user = null;
  }

  private initializeForm(): void {
    this.formUserEditSubmitted = false;
    this.formUserEdit = this.fb.group(this.getUserFormGroup());
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
