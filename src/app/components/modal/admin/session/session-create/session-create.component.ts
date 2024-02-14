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
  FormControl,
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
  selector: 'modal-session-create',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, DialogModule],
  templateUrl: './session-create.component.html',
  styleUrl: './session-create.component.css',
})
export class ModalSessionCreateComponent implements OnChanges, OnInit {
  @Input()
  visible: boolean = false;
  @Output()
  visibleChange = new EventEmitter<boolean>();

  protected films: Film[] = [];
  protected rooms: Room[] = [];

  protected formSessionCreateSubmitted: boolean = false;
  protected formSessionCreate: FormGroup = this.fb.group(
    this.getSessionFormGroup()
  );

  constructor(
    private fb: FormBuilder,
    private filmService: FilmService,
    private roomSrevice: RoomService,
    private sessionService: SessionService,
    private messageService: MessageService
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    this.initializeForm();
  }

  public ngOnInit(): void {
    this.loadData();
  }

  protected get dateControl(): FormControl {
    return this.formSessionCreate.get('date') as FormControl;
  }

  protected get hourControl(): FormControl {
    return this.formSessionCreate.get('hour') as FormControl;
  }

  protected get ticketPriceControl(): FormControl {
    return this.formSessionCreate.get('ticketPrice') as FormControl;
  }

  protected get filmGroup(): FormGroup {
    return this.formSessionCreate.get('film') as FormGroup;
  }

  protected get roomGroup(): FormGroup {
    return this.formSessionCreate.get('room') as FormGroup;
  }

  protected get filmIdControl(): FormGroup {
    return this.filmGroup.get('uuid') as FormGroup;
  }

  protected get roomIdControl(): FormGroup {
    return this.roomGroup.get('uuid') as FormGroup;
  }

  private loadData(): void {
    this.filmService.findAll().subscribe((films) => {
      this.films = films;
    });
    this.roomSrevice.findAll().subscribe((rooms) => {
      this.rooms = rooms;
    });
  }

  protected onSubmit(): void {
    this.formSessionCreateSubmitted = true;
    if (this.formSessionCreate.valid) {
      const session: any = this.formSessionCreate.value;
      this.sessionService.create(session).subscribe({
        next: () => {
          this.sessionService.notifyChangesToSessionsData();
          this.changeVisibilityModal(false);
        },
        error: ({ error }) => {
          this.messageService.add({
            severity: 'error',
            summary: 'ERRO',
            detail: error.message,
          });
        },
      });
    }
  }

  protected changeVisibilityModal(visible: boolean): void {
    this.visible = visible;
    this.visibleChange.emit(visible);
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
      film: this.fb.group({
        uuid: ['', [Validators.required]],
      }),
      room: this.fb.group({
        uuid: ['', [Validators.required]],
      }),
    };
  }
}
