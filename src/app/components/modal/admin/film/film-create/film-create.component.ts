import { FilmService } from './../../../../../services/film.service';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'modal-film-create',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, DialogModule],
  templateUrl: './film-create.component.html',
  styleUrl: './film-create.component.css',
})
export class ModalFilmCreateComponent implements OnChanges {
  @Input()
  visible: boolean = false;
  @Output()
  visibleChange = new EventEmitter<boolean>();

  formFilmCreateSubmitted: boolean = false;
  formFilmCreate: FormGroup = this.fb.group(this.getFilmFormGroup());
  buttonDisabled: boolean = false;

  constructor(
    private fb: FormBuilder,
    private filmService: FilmService,
    private messageService: MessageService
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    this.initializeForm();
  }

  protected onSubmit(): void {
    this.formFilmCreateSubmitted = true;
    if (this.formFilmCreate.valid) {
      const film = this.formFilmCreate.value;
      this.filmService.create(film).subscribe({
        next: () => {
          this.changeVisibilityModal(false);
          this.filmService.notifyChangesToFilmsData();
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'ERRO',
            detail: 'Algo deu errado. Confira o formato dos dados.',
          });
        },
      });
    }
  }

  public selectCoverImage(event: any): void {
    this.buttonDisabled = true;
    const image = event.currentTarget.files[0];
    this.filmService.convertImageToBase64(image, (base64: string) => {
      this.formFilmCreate.get('coverImage')?.setValue(base64);
      this.buttonDisabled = false;
    });
  }

  protected changeVisibilityModal(visible: boolean): void {
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
      resume: ['', [Validators.required, Validators.maxLength(500)]],
      genres: ['', [Validators.required, Validators.maxLength(255)]],
      duration: ['', [Validators.required, Validators.max(3000)]],
      publishedIn: ['', [Validators.required]],
      coverImage: ['', [Validators.required]],
      coverImageFile: ['', [Validators.required]],
    };
  }
}
