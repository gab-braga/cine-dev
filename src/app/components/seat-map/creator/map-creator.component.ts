import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { Subscription } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Area } from '../../../interfaces/area';

@Component({
  selector: 'c-seat-map-creator',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, NgClass, ReactiveFormsModule],
  templateUrl: './map-creator.component.html',
  styleUrl: './map-creator.component.css',
})
export class SeatMapCreatorComponent implements OnInit, OnDestroy {
  AREA_TYPE_SEAT: string = 'SEAT';
  AREA_TYPE_HALL_H: string = 'HALL_H';
  AREA_TYPE_HALL_V: string = 'HALL_V';
  AREA_TYPE_EMPTY: string = 'EMPTY';
  INITIAL_WIDTH_OF_MAP: number = 12;
  INITIAL_HEIGHT_OF_MAP: number = 8;

  @Input()
  public formMap!: FormGroup;

  private subscriptions: Subscription[] = [];
  protected preview: boolean = false;

  protected roomCapacity: number = 0;
  protected mapWidth: number = 0;
  protected mapHeight: number = 0;
  protected map: Area[][] = [];

  constructor(private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.initializeNewMap();
  }

  public ngOnDestroy(): void {}

  private initializeNewMap(): void {
    this.mapWidth = this.INITIAL_WIDTH_OF_MAP;
    this.mapHeight = this.INITIAL_HEIGHT_OF_MAP;
    this.map = this.generateNewMap();
    this.recalculateSeatNumbersAndRoomCapacity();
  }

  protected changeAreaType(event: any, item: any) {
    const areaType = event.target.value;
    item.type = areaType;
    this.recalculateSeatNumbersAndRoomCapacity();
  }

  protected addNewRow(): void {
    this.mapHeight++;
    this.map.push(this.createRow());
    this.recalculateSeatNumbersAndRoomCapacity();
  }

  protected addNewColumn(): void {
    this.mapWidth++;
    let index = 0;
    this.map.forEach((row) => {
      row.push(<Area>{
        indexInX: index++,
        indexInY: this.mapWidth - 1,
        type: this.AREA_TYPE_SEAT,
      });
    });
    this.recalculateSeatNumbersAndRoomCapacity();
  }

  protected removeRow(): void {
    if (this.mapHeight > 1) {
      this.mapHeight--;
      this.map.pop();
      this.recalculateSeatNumbersAndRoomCapacity();
    }
  }

  protected removeColumn(): void {
    if (this.mapWidth > 1) {
      this.mapWidth--;
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

  private generateNewMap(): Area[][] {
    const map: Area[][] = [];
    for (let line = 0; line < this.mapHeight; line++) {
      map[line] = [];
      for (let column = 0; column < this.mapWidth; column++) {
        const area = <Area>{
          indexInX: line,
          indexInY: column,
          type: this.AREA_TYPE_SEAT,
        };
        map[line][column] = area;
      }
    }
    return map;
  }

  private createRow(): Area[] {
    const row: Area[] = [];
    for (let index = 0; index < this.mapWidth; index++) {
      const cell = {
        indexInX: this.mapHeight - 1,
        indexInY: index,
        type: this.AREA_TYPE_SEAT,
      };
      row.push(<Area>cell);
    }
    return row;
  }

  private createNewAreaFormGroup() {
    return this.fb.group({
      uuid: [''],
      number: ['', [Validators.required]],
      indexInX: ['', [Validators.required]],
      indexInY: ['', [Validators.required]],
      type: ['', [Validators.required]],
    });
  }
}
