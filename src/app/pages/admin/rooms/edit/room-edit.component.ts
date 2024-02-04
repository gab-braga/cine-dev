import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LayoutComponent } from '../../../../components/layout/layout.component';
import { SeatMapCreatorComponent } from '../../../../components/seat-map/creator/map-creator.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RoomService } from '../../../../services/room.service';
import { MessageService } from 'primeng/api';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

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
    map: this.fb.group({
      uuid: ['', [Validators.required]],
      width: ['', [Validators.required, Validators.min(1)]],
      height: ['', [Validators.required, Validators.min(1)]],
      areas: this.fb.array([]),
    }),
  });

  constructor(
    private fb: FormBuilder,
    private roomService: RoomService,
    private router: Router,
    private messageService: MessageService
  ) {}

  protected get mapForm(): FormGroup {
    return this.form.get('map') as FormGroup;
  }

  protected onSubmit(): void {
    this.formSubmitted = true;
    if (this.form.valid) {
      const room = this.form.value;
      room.map.areas = room.map.areas.flat();
      const { uuid }: { uuid: string } = room;
      this.roomService.updateSeatMap(uuid, room).subscribe({
        next: () => {
          this.router.navigate(['/admin/rooms']);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'ERRO',
            detail: 'Algo deu errado. Tente mais tarde.',
          });
        },
      });
    }
  }
}
