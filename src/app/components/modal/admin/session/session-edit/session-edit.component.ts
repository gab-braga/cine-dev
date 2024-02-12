import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
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
import { RoomService } from '../../../../../services/room.service';
import { Film } from '../../../../../interfaces/film';
import { Room } from '../../../../../interfaces/room';
import { SessionService } from '../../../../../services/session.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'modal-session-edit',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, DialogModule],
  templateUrl: './session-edit.component.html',
  styleUrl: './session-edit.component.css',
})
export class ModalSessionEditComponent implements OnChanges, OnInit {
  @Input()
  visible: boolean = false;
  @Output()
  visibleChange = new EventEmitter<boolean>();
  @Input({ required: true })
  session: any = null;

  protected films: Film[] = [];
  protected rooms: Room[] = [];

  protected formSessionEditSubmitted: boolean = false;
  protected formSessionEdit: FormGroup = this.fb.group({
    uuid: ['', [Validators.required]],
    date: ['', [Validators.required]],
    hour: ['', [Validators.required]],
    filmId: ['', [Validators.required]],
    roomId: ['', [Validators.required]],
    ticketPrice: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private filmService: FilmService,
    private roomService: RoomService,
    private sessionService: SessionService,
    private messageService: MessageService
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    const session = changes['session']?.currentValue;
    if (session) this.initializeForm(session);
  }

  public ngOnInit(): void {
    this.filmService.findAll().subscribe((films) => {
      this.films = films;
    });
    this.roomService.findAll().subscribe((rooms) => {
      this.rooms = rooms;
    });
  }

  onSubmit(): void {
    this.formSessionEditSubmitted = true;
    if (this.formSessionEdit.valid) {
      const session = this.formSessionEdit.value;
      const { uuid }: { uuid: string } = session;
      this.sessionService.update(uuid, session).subscribe({
        next: () => {
          this.changeVisibilityModal(false);
          this.sessionService.notifyChangesToSessionsData();
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'ERRO',
            detail: 'Algo deu errado. Confira os valores.',
          });
        },
      });
    }
  }

  changeVisibilityModal(visible: boolean): void {
    this.visible = visible;
    this.visibleChange.emit(visible);
    if (!visible) this.session = null;
  }

  private initializeForm(session: any): void {
    this.formSessionEditSubmitted = false;
    this.formSessionEdit.patchValue({
      uuid: session?.uuid,
      date: session?.date,
      hour: session?.hour,
      filmId: session?.film?.uuid,
      roomId: session?.room?.uuid,
      ticketPrice: session?.ticketPrice,
    });
  }
}
