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
import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../../../services/room.service';
import { Map } from '../../../interfaces/map';

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
  public mapForm: FormGroup | undefined;

  private subscriptions: Subscription[] = [];
  protected previewMode: boolean = false;

  protected roomCapacity: number = 0;
  protected mapWidth: number = 0;
  protected mapHeight: number = 0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private roomService: RoomService
  ) {}

  public ngOnInit(): void {
    this.initializeMap();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  public get map() {
    return (<FormGroup>this.mapForm).get('areas') as FormArray<
      FormArray<FormGroup>
    >;
  }

  protected changeAreaType() {
    this.updateMapNumbersAndCapacity();
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
      this.updateMapNumbersAndCapacity();
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
      this.updateMapNumbersAndCapacity();
    }
  }

  protected removeRow(): void {
    if (this.mapHeight > this.LOWER_LIMIT_OF_AREAS) {
      this.setMapHeight(this.mapHeight - 1);
      const indexInY = this.mapHeight;
      this.map.removeAt(indexInY);
      this.updateMapNumbersAndCapacity();
    }
  }

  protected removeColumn(): void {
    if (this.mapWidth > this.LOWER_LIMIT_OF_AREAS) {
      this.setMapWidth(this.mapWidth - 1);
      const indexInX = this.mapWidth;
      this.map.controls.forEach((line) => {
        line.removeAt(indexInX);
      });
      this.updateMapNumbersAndCapacity();
    }
  }

  private initializeMap(): void {
    this.subscriptions.push(
      this.route.params.subscribe((params) => {
        const uuid = params['uuid'];
        if (uuid) this.initializeMapToEdit(uuid);
        else this.initializeNewMap();
      })
    );
  }

  private initializeMapToEdit(uuid: string): void {
    this.roomService.findMapByRoomId(uuid).subscribe((map) => {
      this.initializeMapFormArray(map.width, map.height);
      this.setMapIdInForm(uuid);
      this.setMapDataInForm(map);
      this.updateRoomCapacity();
    });
  }

  private initializeNewMap(): void {
    if (this.mapForm) {
      this.initializeMapFormArray(
        this.INITIAL_WIDTH_OF_MAP,
        this.INITIAL_HEIGHT_OF_MAP
      );
      this.updateMapNumbersAndCapacity();
    }
  }

  private setMapIdInForm(uuid: string) {
    this.mapForm?.get('uuid')?.setValue(uuid);
  }

  private setMapDataInForm(dataMap: Map) {
    dataMap.areas.forEach((area) => {
      this.map.at(area.indexInY).at(area.indexInX).patchValue(area);
    });
  }

  private setMapWidth(width: number): void {
    if (this.mapForm) {
      const widthControl = this.mapForm.get('width') as FormControl;
      if (widthControl) {
        this.mapWidth = width;
        widthControl.setValue(width);
      }
    }
  }

  private setMapHeight(height: number): void {
    if (this.mapForm) {
      const heightControl = this.mapForm.get('height') as FormControl;
      if (heightControl) {
        this.mapHeight = height;
        heightControl.setValue(height);
      }
    }
  }

  private initializeMapFormArray(width: number, height: number) {
    this.setMapWidth(width);
    this.setMapHeight(height);
    for (let y = 0; y < height; y++) {
      let row: FormArray = this.fb.array([]);
      for (let x = 0; x < width; x++) {
        const area = this.createNewAreaForm(x, y);
        row.push(area);
      }
      this.map.push(row);
    }
  }

  private updateMapNumbersAndCapacity(): void {
    this.updateMapNumbers();
    this.updateRoomCapacity();
  }

  private updateMapNumbers(): void {
    let seatsCount = 1,
      emptyCount = -1;
    this.map.controls.forEach((line) => {
      line.controls.forEach((area) => {
        const typeCrtl = area.get('areaType'),
          numberCrtl = area.get('number');
        if (typeCrtl && numberCrtl) {
          if (typeCrtl.value === this.AREA_TYPE_SEAT) {
            numberCrtl.setValue(seatsCount++);
          } else {
            numberCrtl.setValue(emptyCount--);
          }
        }
      });
    });
  }

  private updateRoomCapacity(): void {
    this.roomCapacity = 0;
    this.map.controls.forEach((row) => {
      row.controls.forEach((area) => {
        const areaType = area.get('areaType')?.value;
        if (areaType === this.AREA_TYPE_SEAT) this.roomCapacity++;
      });
    });
  }

  private createNewAreaForm(indexInX: number, indexInY: number): FormGroup {
    return this.fb.group({
      uuid: [''],
      number: [null, [Validators.required]],
      areaType: [this.AREA_TYPE_SEAT, [Validators.required]],
      indexInX: [indexInX, [Validators.required, Validators.min(0)]],
      indexInY: [indexInY, [Validators.required, Validators.min(0)]],
    });
  }
}
