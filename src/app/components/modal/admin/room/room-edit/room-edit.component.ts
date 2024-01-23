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
import { RoomService } from '../../../../../services/room.service';
import { Room } from '../../../../../interfaces/room';
import { MessageService } from 'primeng/api';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'modal-room-edit',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, DialogModule, RouterLink],
  templateUrl: './room-edit.component.html',
  styleUrl: './room-edit.component.css',
})
export class ModalRoomEditComponent implements OnChanges {
  @Input()
  visible: boolean = false;
  @Output()
  visibleChange = new EventEmitter<boolean>();
  @Input({ required: true })
  room: Room | null = null;

  formRoomEditSubmitted: boolean = false;
  formRoomEdit: FormGroup = this.fb.group({
    uuid: ['', [Validators.required]],
    number: ['', [Validators.required]],
    projectionType: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private roomService: RoomService,
    private messageService: MessageService
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    const room = changes['room']?.currentValue;
    if (room) this.initializeForm(room);
  }

  onSubmit(): void {
    this.formRoomEditSubmitted = true;
    if (this.formRoomEdit.valid) {
      const room = this.formRoomEdit.value;
      const { uuid }: { uuid: string } = room;
      this.roomService.updateDetails(uuid, room).subscribe({
        next: () => {
          this.changeVisibilityModal(false);
          this.roomService.notifyChangesToRoomsData();
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
    if (!visible) this.room = null;
  }

  private initializeForm(room: any): void {
    this.formRoomEditSubmitted = false;
    this.formRoomEdit.patchValue({
      uuid: room?.uuid,
      number: room?.number,
      projectionType: room?.projectionType,
    });
  }
}
