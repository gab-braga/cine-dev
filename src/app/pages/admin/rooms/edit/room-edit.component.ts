import { SeatMapCreatorComponent } from '../../../../components/seat-map/creator/map-creator.component';
import { Component } from '@angular/core';
import { LayoutComponent } from '../../../../components/layout/layout.component';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { RoomService } from '../../../../services/room.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-room-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LayoutComponent,
    RouterLink,
    InputTextModule,
    SeatMapCreatorComponent,
    ButtonModule,
  ],
  templateUrl: './room-edit.component.html',
  styleUrl: './room-edit.component.css',
})
export class RoomEditComponent {
  formSubmitted: boolean = false;
  form: FormGroup = this.fb.group({
    uuid: ['', [Validators.required]],
    width: [0, [Validators.required, Validators.min(1)]],
    height: [0, [Validators.required, Validators.min(1)]],
    capacity: [0, [Validators.required, Validators.min(1)]],
    seats: [null, [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private roomService: RoomService,
    private router: Router,
    private messageService: MessageService
  ) {}

  protected onSubmit(): void {
    this.formSubmitted = true;
    if (this.form.valid) {
      const room = this.form.value;
      console.log(room);
      const { uuid }: { uuid: string } = room;
      this.roomService.updateSeatMap(uuid, room).subscribe({
        next: () => {
          this.router.navigate(['/admin/rooms']);
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
}
