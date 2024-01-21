import { SeatMapCreatorComponent } from '../../../../components/seat-map/creator/map-creator.component';
import { Component, OnInit } from '@angular/core';
import { LayoutComponent } from '../../../../components/layout/layout.component';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RoomService } from '../../../../services/room.service';
import { MessageService } from 'primeng/api';
import { Room } from '../../../../interfaces/room';

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
export class RoomEditComponent implements OnInit {
  private uuid: string = '';
  formSubmitted: boolean = false;
  form: FormGroup = this.fb.group({
    number: ['', [Validators.required]],
    projectionType: ['', [Validators.required]],
    width: [0, [Validators.required, Validators.min(1)]],
    height: [0, [Validators.required, Validators.min(1)]],
    capacity: [0, [Validators.required, Validators.min(1)]],
    seats: [null, [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private roomService: RoomService,
    private router: Router,
    private messageService: MessageService
  ) {}

  public ngOnInit(): void {
    this.loadData();
  }

  protected onSubmit(): void {
    this.formSubmitted = true;
    if (this.form.valid) {
      const room = this.form.value;
      console.log(room);
      // this.roomService.update(this.uuid, room).subscribe({
      //   next: () => {
      //     this.router.navigate(['/admin/rooms']);
      //   },
      //   error: () => {
      //     this.messageService.add({
      //       severity: 'error',
      //       summary: 'ERRO',
      //       detail: 'Algo deu errado. Confira os valores.',
      //     });
      //   },
      // });
    }
  }

  private loadData(): void {
    this.route.params.subscribe((params) => {
      this.uuid = params['uuid'];
      this.roomService.findByUUID(this.uuid).subscribe((room) => {
        this.initializeForm(room);
      });
    });
  }

  private initializeForm(room: any): void {
    this.form.patchValue({
      number: room.number,
      projectionType: room.projectionType,
      width: room.width,
      height: room.height,
      capacity: room.capacity,
      seats: null,
    });
  }
}
