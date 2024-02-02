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
import { Area } from '../../../../interfaces/area';
import { NgClass } from '@angular/common';

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
    NgClass,
  ],
  templateUrl: './room-create.component.html',
  styleUrl: './room-create.component.css',
})
export class RoomCreateComponent implements OnInit {
  AREA_TYPE_SEAT: string = 'SEAT';
  AREA_TYPE_HALL_H: string = 'HALL_H';
  AREA_TYPE_HALL_V: string = 'HALL_V';
  AREA_TYPE_EMPTY: string = 'EMPTY';
  INITIAL_WIDTH_OF_MAP: number = 12;
  INITIAL_HEIGHT_OF_MAP: number = 8;

  formSubmitted: boolean = false;
  form: FormGroup = this.fb.group({
    uuid: [''],
    number: ['', [Validators.required]],
    projectionType: ['', [Validators.required]],
    width: ['', [Validators.required, Validators.min(1)]],
    height: ['', [Validators.required, Validators.min(1)]],
    capacity: ['', [Validators.required, Validators.min(1)]],
    seats: ['', [Validators.required]],
  });

  map: Area[][] = [];
  heightMap: number = 0;
  widthMap: number = 0;
  roomCapacity: number = 0;
  preview: boolean = false;

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
    this.widthMap = this.INITIAL_WIDTH_OF_MAP;
    this.heightMap = this.INITIAL_HEIGHT_OF_MAP;
    this.map = this.generateNewMap();
    this.recalculateSeatNumbersAndRoomCapacity();
  }

  protected changeAreaType(event: any, item: any) {
    const areaType = event.target.value;
    item.type = areaType;
    this.recalculateSeatNumbersAndRoomCapacity();
  }

  protected onSubmit(): void {
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

  protected addNewRow(): void {
    this.heightMap++;
    this.map.push(this.createRow());
    this.recalculateSeatNumbersAndRoomCapacity();
  }

  protected addNewColumn(): void {
    this.widthMap++;
    let index = 0;
    this.map.forEach((row) => {
      row.push(<Area>{
        indexInX: index++,
        indexInY: this.widthMap - 1,
        type: this.AREA_TYPE_SEAT,
      });
    });
    this.recalculateSeatNumbersAndRoomCapacity();
  }

  protected removeRow(): void {
    if (this.heightMap > 1) {
      this.heightMap--;
      this.map.pop();
      this.recalculateSeatNumbersAndRoomCapacity();
    }
  }

  protected removeColumn(): void {
    if (this.widthMap > 1) {
      this.widthMap--;
      this.map.forEach((row) => {
        row.pop();
      });
      this.recalculateSeatNumbersAndRoomCapacity();
    }
  }

  private recalculateSeatNumbersAndRoomCapacity(): void {
    let capacity = 0;
    let countSeats = 1;
    this.map.forEach((row) => {
      row.forEach((area) => {
        if (area.type === this.AREA_TYPE_SEAT) {
          area.number = countSeats++;
          capacity++;
        }
      });
    });
    this.roomCapacity = capacity;
  }

  protected togglePreviewMode(): void {
    this.preview = !this.preview;
  }

  private generateNewMap(): any {
    const map: any[][] = [];
    for (let line = 0; line < this.heightMap; line++) {
      map[line] = [];
      for (let column = 0; column < this.widthMap; column++) {
        const cell = {
          indexInX: line,
          indexInY: column,
          type: this.AREA_TYPE_SEAT,
        };
        map[line][column] = cell;
      }
    }
    return map;
  }

  private createRow(): Area[] {
    const row: Area[] = [];
    for (let index = 0; index < this.widthMap; index++) {
      const cell = {
        indexInX: this.heightMap - 1,
        indexInY: index,
        type: this.AREA_TYPE_SEAT,
      };
      row.push(<Area>cell);
    }
    return row;
  }
}
