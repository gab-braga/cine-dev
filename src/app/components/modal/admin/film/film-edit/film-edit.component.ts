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
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FilmService } from '../../../../../services/film.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'modal-film-edit',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, DialogModule],
  templateUrl: './film-edit.component.html',
  styleUrl: './film-edit.component.css',
})
export class ModalFilmEditComponent implements OnChanges {
  @Input()
  visible: boolean = false;
  @Output()
  visibleChange = new EventEmitter<boolean>();
  @Input({ required: true })
  film: any = null;

  protected btnDisabled: boolean = false;
  protected formFilmEditSubmitted: boolean = false;
  protected formFilmEdit: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(120)]],
    resume: ['', [Validators.required, Validators.maxLength(500)]],
    genres: ['', [Validators.required, Validators.maxLength(255)]],
    duration: ['', [Validators.required, Validators.max(3000)]],
    publishedIn: ['', [Validators.required]],
    coverImage: ['', [Validators.required]],
    coverImageFile: [''],
    uuid: [''],
  });

  constructor(
    private fb: FormBuilder,
    private filmService: FilmService,
    private messageService: MessageService
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    const film = changes['film']?.currentValue;
    if (film) this.initializeForm(film);
  }

  protected onSubmit(): void {
    this.formFilmEditSubmitted = true;
    if (this.formFilmEdit.valid) {
      const film = this.formFilmEdit.value;
      const uuid: string = film.uuid || '';
      this.filmService.update(uuid, film).subscribe({
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

  protected selectCoverImage(event: any): void {
    this.btnDisabled = true;
    const image = event.currentTarget.files[0];
    this.filmService.convertImageToBase64(image, (base64: string) => {
      this.formFilmEdit.get('coverImage')?.setValue(base64);
      this.btnDisabled = false;
    });
  }

  protected changeVisibilityModal(visible: boolean): void {
    this.visible = visible;
    this.visibleChange.emit(visible);
  }

  private initializeForm(film: any): void {
    this.formFilmEditSubmitted = false;
    this.formFilmEdit.patchValue({
      title: film.title,
      resume: film.resume,
      genres: film.genres,
      duration: film.duration,
      publishedIn: film.publishedIn,
      coverImage: film.coverImage,
      uuid: film.uuid,
      coverImageFile: '',
    });
  }
}
