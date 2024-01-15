import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'c-room',
  standalone: true,
  imports: [NgClass],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css',
})
export class RoomComponent {
  @Input()
  width: number = 12;
  hieght: number = 8;
  seats: any = [];
  styleGrid: string = `display: grid; grid-template-columns: repeat(${this.width}, 1fr); gap: 2rem`;

  initializeSeats(): void {
    for (let x: number = 1, num: number = 1; x <= this.width; x++) {
      for (let y: number = 1; y <= this.hieght; y++, num++) {
        this.seats.push({
          number: num,
          positionInX: x,
          positionInY: y,
          disabled: false,
        });
      }
    }
  }

  constructor() {
    this.initializeSeats();
  }

  disableSeat(seat: any): void {
    const { number } = seat;
    this.seats.forEach((elem: any) => {
      if (elem.number == number) elem.disabled = true;
    });
  }

  getCountSeat(): number {
    let count = 0;
    this.seats.forEach((elem: any) => {
      if (!elem.disabled) count++;
    });
    return count;
  }
}
