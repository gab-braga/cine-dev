import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
export class RoomEditComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  formSubmitted: boolean = false;
  form: FormGroup = this.fb.group({
    uuid: ['', [Validators.required]],
    map: this.fb.group({
      width: ['', [Validators.required, Validators.min(1)]],
      height: ['', [Validators.required, Validators.min(1)]],
      areas: this.fb.array([]),
    }),
  });

  constructor(
    private fb: FormBuilder,
    private roomService: RoomService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {}

  public ngOnInit(): void {
    this.initializeRoomId();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  protected get mapForm(): FormGroup {
    return this.form.get('map') as FormGroup;
  }

  private initializeRoomId(): void {
    this.subscriptions.push(
      this.route.params.subscribe((params) => {
        const uuid = params['uuid'];
        this.form.get('uuid')?.setValue(uuid);
      })
    );
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
