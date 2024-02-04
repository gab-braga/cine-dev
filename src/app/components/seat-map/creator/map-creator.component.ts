import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { Subscription } from 'rxjs';
import {
  FormArray,
  FormBuilder,
  FormControl,
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
  LOWER_LIMIT_OF_AREAS: number = 1;
  UPPER_LIMIT_OF_AREAS: number = 30;
  @Input()
  public formMap: FormGroup | undefined;

  private subscriptions: Subscription[] = [];
  protected preview: boolean = false;

  protected roomCapacity: number = 0;
  protected mapWidth: number = 0;
  protected mapHeight: number = 0;
  protected map: Area[][] = [];

  constructor(private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.initializeNewMap();
    this.recalculateSeatNumbers();
  }

  get areas() {
    return (<FormGroup>this.formMap).get('areas') as FormArray<
      FormArray<FormGroup>
    >;
  }

  public ngOnDestroy(): void {}

  private initializeNewMap(): void {
    this.mapWidth = this.INITIAL_WIDTH_OF_MAP;
    this.mapHeight = this.INITIAL_HEIGHT_OF_MAP;
    if (this.formMap) this.initializeNewFormMap();
  }

  protected changeAreaType() {
    this.recalculateSeatNumbers();
  }

  protected addNewRow(): void {
    if (this.mapHeight < this.UPPER_LIMIT_OF_AREAS) {
      let indexInY = this.mapHeight++;
      let indexInX = 0;
      let line: FormArray = this.fb.array([]);
      while (indexInX < this.mapWidth)
        line.push(this.generateAreaFormGruop(indexInX++, indexInY));
      this.areas.push(line);
      this.recalculateSeatNumbers();
    }
  }

  protected addNewColumn(): void {
    if (this.mapWidth < this.UPPER_LIMIT_OF_AREAS) {
      let indexInX = this.mapWidth++;
      let indexInY = 0;
      this.areas.controls.forEach((area) => {
        area.push(this.generateAreaFormGruop(indexInX, indexInY++));
      });
      this.recalculateSeatNumbers();
    }
  }

  protected removeRow(): void {
    if (this.mapHeight > this.LOWER_LIMIT_OF_AREAS) {
      this.areas.removeAt(--this.mapHeight);
      this.recalculateSeatNumbers();
    }
  }

  protected removeColumn(): void {
    if (this.mapWidth > this.LOWER_LIMIT_OF_AREAS) {
      const indexLast = --this.mapWidth;
      this.areas.controls.forEach((area) => {
        area.removeAt(indexLast);
      });
      this.recalculateSeatNumbers();
    }
  }

  private recalculateSeatNumbers(): void {
    let countSeats = 1;
    let countEmpty = -1;
    this.areas.controls.forEach((line) => {
      line.controls.forEach((area) => {
        const formControlType = area.get('type');
        const formControlNumber = area.get('number');
        if (formControlType && formControlNumber) {
          if (formControlType.value === this.AREA_TYPE_SEAT) {
            formControlNumber.setValue(countSeats++);
          } else {
            formControlNumber.setValue(countEmpty--);
          }
        }
      });
    });
  }

  protected togglePreviewMode(): void {
    this.preview = !this.preview;
  }

  private initializeNewFormMap() {
    const map: FormArray = this.areas;
    for (let y = 0; y < this.mapHeight; y++) {
      map.push(this.fb.array([]));
      const line = map.at(y) as FormArray;
      for (let x = 0; x < this.mapWidth; x++) {
        const column = this.generateAreaFormGruop(x, y);
        line.push(column);
      }
    }
    return map;
  }

  private generateAreaFormGruop(x: number, y: number): FormGroup {
    return this.fb.group({
      uuid: [null],
      number: [null],
      type: [this.AREA_TYPE_SEAT, [Validators.required]],
      indexInX: [x, [Validators.required, Validators.min(1)]],
      indexInY: [y, [Validators.required, Validators.min(1)]],
    });
  }

  protected getType(col: FormGroup) {
    const colum = col.get('type') as FormControl<string>;
    return colum.value;
  }
}
