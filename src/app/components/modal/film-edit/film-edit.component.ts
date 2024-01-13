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
  selector: 'modal-film-edit',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, DialogModule],
  templateUrl: './film-edit.component.html',
  styleUrl: './film-edit.component.css',
})
export class ModalFilmEditComponent {
  constructor(private fb: FormBuilder) {}
  @Input()
  visible: boolean = false;
  @Output()
  visibleChange = new EventEmitter<boolean>();
  @Input({ required: true })
  film: any = null;

  formFilmEditSubmitted: boolean = false;
  formFilmEdit: FormGroup = this.fb.group(this.getFilmFormGroup());

  onSubmit(): void {
    this.formFilmEditSubmitted = true;
    if (this.formFilmEdit.valid) console.log(this.formFilmEdit.value);
  }

  closeModal(visible: boolean): void {
    this.visible = visible;
    this.visibleChange.emit(visible);
    this.initializeForm();
    if (!visible) this.film = null;
  }

  private initializeForm(): void {
    this.formFilmEditSubmitted = false;
    this.formFilmEdit = this.fb.group(this.getFilmFormGroup());
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
