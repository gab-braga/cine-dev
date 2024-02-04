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
  protected previewMode: boolean = false;

  protected roomCapacity: number = 0;
  protected mapWidth: number = 0;
  protected mapHeight: number = 0;

  constructor(private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.initializeMap();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  private initializeMap(): void {
    this.setMapWidth(this.INITIAL_WIDTH_OF_MAP);
    this.setMapHeight(this.INITIAL_HEIGHT_OF_MAP);
    if (this.formMap) this.initializeNewMapForm();
  }

  public get map() {
    return (<FormGroup>this.formMap).get('areas') as FormArray<
      FormArray<FormGroup>
    >;
  }

  protected changeAreaType() {
    this.updateMapValues();
  }

  protected togglePreviewMode(): void {
    this.previewMode = !this.previewMode;
  }

  protected getControlValue(group: FormGroup, controlName: string) {
    return (<FormControl>group.get(controlName)).value;
  }

  protected calcPosition(x: number, y: number) {
    return y * this.mapWidth + x + 1;
  }

  protected addNewRow(): void {
    if (this.mapHeight < this.UPPER_LIMIT_OF_AREAS) {
      let indexInY = this.mapHeight;
      let indexInX = 0;
      this.setMapHeight(this.mapHeight + 1);
      let line: FormArray = this.fb.array([]);
      while (indexInX < this.mapWidth)
        line.push(this.createNewAreaForm(indexInX++, indexInY));
      this.map.push(line);
      this.updateMapValues();
    }
  }

  protected addNewColumn(): void {
    if (this.mapWidth < this.UPPER_LIMIT_OF_AREAS) {
      let indexInX = this.mapWidth;
      let indexInY = 0;
      this.setMapWidth(this.mapWidth + 1);
      this.map.controls.forEach((line) => {
        line.push(this.createNewAreaForm(indexInX, indexInY++));
      });
      this.updateMapValues();
    }
  }

  protected removeRow(): void {
    if (this.mapHeight > this.LOWER_LIMIT_OF_AREAS) {
      this.setMapHeight(this.mapHeight - 1);
      const indexInY = this.mapHeight;
      this.map.removeAt(indexInY);
      this.updateMapValues();
    }
  }

  protected removeColumn(): void {
    if (this.mapWidth > this.LOWER_LIMIT_OF_AREAS) {
      this.setMapWidth(this.mapWidth - 1);
      const indexInX = this.mapWidth;
      this.map.controls.forEach((line) => {
        line.removeAt(indexInX);
      });
      this.updateMapValues();
    }
  }

  public setMapWidth(width: number): void {
    if (this.formMap) {
      const widthControl = this.formMap.get('width') as FormControl;
      if (widthControl) {
        this.mapWidth = width;
        widthControl.setValue(width);
      }
    }
  }

  public setMapHeight(height: number): void {
    if (this.formMap) {
      const heightControl = this.formMap.get('height') as FormControl;
      if (heightControl) {
        this.mapHeight = height;
        heightControl.setValue(height);
      }
    }
  }

  private initializeNewMapForm() {
    for (let y = 0; y < this.mapHeight; y++) {
      let line: FormArray = this.fb.array([]);
      for (let x = 0; x < this.mapWidth; x++) {
        const area = this.createNewAreaForm(x, y);
        line.push(area);
      }
      this.map.push(line);
    }
    this.updateMapValues();
  }

  private updateMapValues(): void {
    let seatsCount = 1,
      emptyCount = -1;
    this.roomCapacity = 0;
    this.map.controls.forEach((line) => {
      line.controls.forEach((area) => {
        const typeControl = area.get('type');
        const numberControl = area.get('number');
        if (typeControl && numberControl) {
          if (typeControl.value === this.AREA_TYPE_SEAT) {
            numberControl.setValue(seatsCount++);
            this.roomCapacity++;
          } else {
            numberControl.setValue(emptyCount--);
          }
        }
      });
    });
  }

  private createNewAreaForm(indexInX: number, indexInY: number): FormGroup {
    return this.fb.group({
      uuid: [''],
      number: [null, [Validators.required]],
      type: [this.AREA_TYPE_SEAT, [Validators.required]],
      indexInX: [indexInX, [Validators.required, Validators.min(0)]],
      indexInY: [indexInY, [Validators.required, Validators.min(0)]],
    });
  }
}
