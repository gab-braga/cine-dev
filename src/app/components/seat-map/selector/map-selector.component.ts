import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { Subscription, debounceTime, merge } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'c-seat-map-selector',
  standalone: true,
  imports: [NgClass],
  templateUrl: './map-selector.component.html',
  styleUrl: './map-selector.component.css',
})
export class SeatMapSelectorComponent implements OnInit, OnDestroy {
  @Input()
  form: FormGroup = new FormGroup({});
  private subscriptions: Subscription[] = [];
  protected seats: any = [];
  protected styleGrid: string = '';

  ngOnInit(): void {
    this.handleChangeDimension();
    this.synchronizeFormAndRoomSize();
  }

  ngOnDestroy(): void {
    this.clearSubscriptions();
  }

  private handleChangeDimension(): void {
    const widthControl = this.form.get('width');
    const heightControl = this.form.get('height');
    if (widthControl && heightControl) {
      const width = widthControl.value || 0;
      const height = heightControl.value || 0;
      this.styleGrid = `display: grid; grid-template-columns: repeat(${width}, 1fr); gap: 2rem`;
      this.initializeListSeats(width, height);
      this.updateCapacityAndSeatsFormValues();
    }
  }

  private initializeListSeats(width: number, height: number): void {
    this.seats = [];
    for (let x: number = 1, num: number = 1; x <= width; x++) {
      for (let y: number = 1; y <= height; y++, num++) {
        this.seats.push({
          number: num,
          positionInX: x,
          positionInY: y,
          disabled: false,
        });
      }
    }
  }

  private updateCapacityAndSeatsFormValues(): void {
    const capacityControl = this.form.get('capacity');
    const seatsControl = this.form.get('seats');
    if (capacityControl) capacityControl.setValue(this.getCountSeat());
    if (seatsControl) seatsControl.setValue(this.seats);
  }

  private synchronizeFormAndRoomSize(): void {
    const widthControl = this.form.get('width');
    const heightControl = this.form.get('height');

    if (widthControl && heightControl)
      this.subscriptions.push(
        merge(widthControl.valueChanges, heightControl.valueChanges)
          .pipe(debounceTime(300))
          .subscribe(() => {
            this.handleChangeDimension();
          })
      );
  }

  toggleSeatDisabledStatus(seat: any): void {
    const { number } = seat;
    const targetSeat = this.seats.find((elem: any) => elem.number == number);
    if (targetSeat) targetSeat.disabled = !targetSeat.disabled;
    this.updateCapacityAndSeatsFormValues();
  }

  getCountSeat(): number {
    return this.seats.filter((elem: any) => !elem.disabled).length;
  }

  private clearSubscriptions(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
