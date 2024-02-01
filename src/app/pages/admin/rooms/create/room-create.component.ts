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
import { Router, RouterLink } from '@angular/router';
import { RoomService } from '../../../../services/room.service';
import { MessageService } from 'primeng/api';
import { MapCell } from '../../../../interfaces/cell';

@Component({
  selector: 'app-room-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LayoutComponent,
    RouterLink,
    InputTextModule,
    SeatMapCreatorComponent,
    ButtonModule,
  ],
  templateUrl: './room-create.component.html',
  styleUrl: './room-create.component.css',
})
export class RoomCreateComponent implements OnInit {
  CELL_TYPE_SEAT: string = 'SEAT';
  CELL_TYPE_HALLH: string = 'HALLH';
  CELL_TYPE_HALLV: string = 'HALLV';
  CELL_TYPE_EMPTY: string = 'EMPTY';
  INITIAL_WIDTH_OF_MAP: number = 12;
  INITIAL_HEIGHT_OF_MAP: number = 8;

  formSubmitted: boolean = false;
  form: FormGroup = this.fb.group({
    uuid: [''],
    number: ['', [Validators.required]],
    projectionType: ['', [Validators.required]],
    width: [12, [Validators.required, Validators.min(1)]],
    height: [8, [Validators.required, Validators.min(1)]],
    capacity: [24, [Validators.required, Validators.min(1)]],
    seats: [null, [Validators.required]],
  });

  mapCells: MapCell[][] = [];
  heightMap: number = 0;
  widthMap: number = 0;
  capacityRoom: number = 0;

  constructor(
    private fb: FormBuilder,
    private roomService: RoomService,
    private router: Router,
    private messageService: MessageService
  ) {}

  public ngOnInit(): void {
    this.initializeNewMap();
  }

  private initializeNewMap(): void {
    const mapCells: any[][] = [];
    let countSeat: number = 1;
    for (let line = 0; line < this.INITIAL_HEIGHT_OF_MAP; line++) {
      mapCells[line] = [];
      for (let column = 0; column < this.INITIAL_WIDTH_OF_MAP; column++) {
        const cell = {
          number: countSeat++,
          indexInX: line,
          indexInY: column,
          type: this.CELL_TYPE_SEAT,
        };
        mapCells[line][column] = cell;
      }
    }
    this.mapCells = mapCells;
  }

  protected toggle(cell: MapCell, type: string): void {
    cell.type = type;
  }

  onSubmit(): void {
    this.formSubmitted = true;
    if (this.form.valid) {
      const room = this.form.value;
      this.roomService.create(room).subscribe({
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
