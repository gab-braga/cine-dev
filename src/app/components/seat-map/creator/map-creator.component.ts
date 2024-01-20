import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { Subscription, debounceTime, merge } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'c-seat-map-creator',
  standalone: true,
  imports: [NgClass],
  templateUrl: './map-creator.component.html',
  styleUrl: './map-creator.component.css',
})
export class SeatMapCreatorComponent implements OnInit, OnDestroy {
  @Input()
  form: FormGroup = new FormGroup({});
  private subscriptions: Subscription[] = [];
  protected seats: any = [];
  protected styleGrid: string = '';

  public ngOnInit(): void {
    this.synchronizeFormAndRoomSize();
    this.handleChangeDimension();
  }

  public ngOnDestroy(): void {
    this.clearSubscriptions();
  }

  protected toggleSeatDisabledStatus(seat: any): void {
    const { number } = seat;
    const targetSeat = this.seats.find((elem: any) => elem.number == number);
    if (targetSeat) targetSeat.empty = !targetSeat.empty;
    this.recalculateCapacityValue();
    this.rearrangeSeatsMap();
  }

  protected getCountSeat(): number {
    return this.seats.filter((elem: any) => !elem.empty).length;
  }

  private handleChangeDimension(): void {
    const widthControl = this.form.get('width');
    const heightControl = this.form.get('height');
    if (widthControl && heightControl) {
      const width = widthControl.value || 0;
      const height = heightControl.value || 0;
      this.styleGrid = `display: grid; grid-template-columns: repeat(${width}, 1fr); gap: 2rem`;
      this.initializeListSeats(width, height);
      this.recalculateCapacityValue();
      this.rearrangeSeatsMap();
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
          empty: false,
        });
      }
    }
  }

  private recalculateCapacityValue(): void {
    const capacityControl = this.form.get('capacity');
    if (capacityControl) capacityControl.setValue(this.getCountSeat());
  }

  private rearrangeSeatsMap(): void {
    let seatCount = 1;
    let emptyCount = -1;
    this.seats.forEach((seat: any) => {
      if (seat.empty) seat.number = emptyCount--;
      else seat.number = seatCount++;
    });
    const seatsControl = this.form.get('seats');
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

  private clearSubscriptions(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
