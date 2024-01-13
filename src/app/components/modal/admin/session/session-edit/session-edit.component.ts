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
  selector: 'modal-session-edit',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, DialogModule],
  templateUrl: './session-edit.component.html',
  styleUrl: './session-edit.component.css',
})
export class ModalSessionEditComponent {
  constructor(private fb: FormBuilder) {}
  @Input()
  visible: boolean = false;
  @Output()
  visibleChange = new EventEmitter<boolean>();
  @Input({ required: true })
  session: any = null;

  formSessionEditSubmitted: boolean = false;
  formSessionEdit: FormGroup = this.fb.group(this.getSessionFormGroup());

  onSubmit(): void {
    this.formSessionEditSubmitted = true;
    if (this.formSessionEdit.valid) console.log(this.formSessionEdit.value);
  }

  closeModal(visible: boolean): void {
    this.visible = visible;
    this.visibleChange.emit(visible);
    this.initializeForm();
    if (!visible) this.session = null;
  }

  private initializeForm(): void {
    this.formSessionEditSubmitted = false;
    this.formSessionEdit = this.fb.group(this.getSessionFormGroup());
  }

  private getSessionFormGroup() {
    return {
      ticketPrice: ['', [Validators.required]],
      date: ['', [Validators.required]],
      hour: ['', [Validators.required]],
      film: ['', [Validators.required]],
      room: ['', [Validators.required]],
    };
  }
}
