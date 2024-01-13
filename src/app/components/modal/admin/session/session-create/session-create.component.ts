import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'modal-session-create',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, DialogModule],
  templateUrl: './session-create.component.html',
  styleUrl: './session-create.component.css',
})
export class ModalSessionCreateComponent {
  constructor(private fb: FormBuilder) {}
  @Input()
  visible: boolean = false;
  @Output()
  visibleChange = new EventEmitter<boolean>();

  formSessionCreateSubmitted: boolean = false;
  formSessionCreate = this.fb.group(this.getSessionFormGroup());

  onSubmit(): void {
    this.formSessionCreateSubmitted = true;
    if (this.formSessionCreate.valid) console.log(this.formSessionCreate.value);
  }

  closeModal(visible: boolean): void {
    this.visible = visible;
    this.visibleChange.emit(visible);
    this.initializeForm();
  }

  private initializeForm(): void {
    this.formSessionCreateSubmitted = false;
    this.formSessionCreate = this.fb.group(this.getSessionFormGroup());
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
