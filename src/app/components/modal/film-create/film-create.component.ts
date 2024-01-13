import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'modal-film-create',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, DialogModule],
  templateUrl: './film-create.component.html',
  styleUrl: './film-create.component.css',
})
export class ModalFilmCreateComponent {
  constructor(private fb: FormBuilder) {}
  @Input()
  visible: boolean = false;
  @Output()
  visibleChange = new EventEmitter<boolean>();

  formFilmCreateSubmitted: boolean = false;
  formFilmCreate = this.fb.group(this.getFilmFormGroup());

  onSubmit(): void {
    this.formFilmCreateSubmitted = true;
    if (this.formFilmCreate.valid) console.log(this.formFilmCreate.value);
  }

  closeModal(visible: boolean): void {
    this.visible = visible;
    this.visibleChange.emit(visible);
    this.initializeForm();
  }

  private initializeForm(): void {
    this.formFilmCreateSubmitted = false;
    this.formFilmCreate = this.fb.group(this.getFilmFormGroup());
  }

  private getFilmFormGroup() {
    return {
      title: ['', [Validators.required, Validators.maxLength(120)]],
      resume: ['', [Validators.required], Validators.maxLength(500)],
      genres: ['', [Validators.required], Validators.maxLength(255)],
      duration: ['', [Validators.required, Validators.max(3000)]],
      publishedIn: ['', [Validators.required]],
    };
  }
}
