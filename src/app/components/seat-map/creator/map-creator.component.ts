import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { Subscription, debounceTime, merge } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../../../services/room.service';

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

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService
  ) {}

  public ngOnInit(): void {
    this.loadData();
    this.synchronizeFormAndRoomSize();
  }

  public ngOnDestroy(): void {
    this.clearSubscriptions();
  }

  private loadData(): void {
    this.subscriptions.push(
      this.route.params.subscribe((params) => {
        const uuid = params['uuid'];
        if (uuid) {
          this.roomService.findSeatsByRoomId(uuid).subscribe((seats) => {
            this.seats = seats;
            this.updateGridStyle();
          });
        } else {
          this.drawSeatMap();
        }
      })
    );
  }

  private drawSeatMap(): void {
    const { width, height } = this.getRoomDimension();
    this.initializeSeatList(width, height);
    this.updateSeatMap();
  }

  private updateSeatNumbers(): void {
    let seatCount = 1;
    let emptyCount = -1;
    this.seats.forEach((seat: any) => {
      if (seat.empty) seat.number = emptyCount--;
      else seat.number = seatCount++;
    });
  }

  private initializeSeatList(width: number, height: number): void {
    this.seats = [];
    for (let x: number = 1, count: number = 1; x <= width; x++) {
      for (let y: number = 1; y <= height; y++, count++) {
        this.seats.push({
          number: count,
          position: count,
          positionInX: x,
          positionInY: y,
          empty: false,
        });
      }
    }
  }

  private synchronizeFormAndRoomSize(): void {
    const widthControl = this.form.get('width');
    const heightControl = this.form.get('height');
    if (widthControl && heightControl)
      this.subscriptions.push(
        merge(widthControl.valueChanges, heightControl.valueChanges)
          .pipe(debounceTime(300))
          .subscribe(() => {
            this.drawSeatMap();
          })
      );
  }

  private updateSeatMap(): void {
    this.updateSeatNumbers();
    this.updateSeatListValues();
    this.updateCapacityValue();
    this.updateGridStyle();
  }

  private updateGridStyle(): void {
    const { width } = this.getRoomDimension();
    this.styleGrid = `display: grid; grid-template-columns: repeat(${width}, 1fr); gap: 2rem`;
  }

  private updateCapacityValue(): void {
    const capacityControl = this.form.get('capacity');
    if (capacityControl) capacityControl.setValue(this.getCountSeat());
  }

  private updateSeatListValues(): void {
    const seatsControl = this.form.get('seats');
    if (seatsControl) seatsControl.setValue(this.seats);
  }

  private getRoomDimension(): { width: number; height: number } {
    const widthControl = this.form.get('width');
    const heightControl = this.form.get('height');
    if (widthControl && heightControl) {
      const width: number = widthControl.value || 0;
      const height: number = heightControl.value || 0;
      return { width, height };
    }
    throw new Error('Undefined width and height');
  }

  private clearSubscriptions(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  protected toggleSeatStatusAndSpaceEmpty(seat: any): void {
    const { number } = seat;
    const targetSeat = this.seats.find((elem: any) => elem.number == number);
    if (targetSeat) targetSeat.empty = !targetSeat.empty;
    this.updateSeatMap();
  }

  protected getCountSeat(): number {
    return this.seats.filter((elem: any) => !elem.empty).length;
  }
}
