import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { Subscription, debounceTime, merge } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from '../../../services/ticket.service';
import { Ticket } from '../../../interfaces/ticket';
import { Room } from '../../../interfaces/room';

@Component({
  selector: 'c-seat-map-selector',
  standalone: true,
  imports: [NgClass],
  templateUrl: './map-selector.component.html',
  styleUrl: './map-selector.component.css',
})
export class SeatMapSelectorComponent implements OnInit, OnDestroy {
  @Input()
  public form: FormGroup = new FormGroup({});
  private subscriptions: Subscription[] = [];
  protected tickets: any = [];
  protected styleGrid: string = '';

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  private loadData(): void {
    this.subscriptions.push(
      this.route.params.subscribe((params) => {
        const sessionId = params['uuid'];
        if (sessionId) {
          this.ticketService
            .findBySessionId(sessionId)
            .subscribe(([tickets, room]) => {
              this.mapinitnow(tickets, room);
            });
        }
      })
    );
  }

  private mapinitnow(tickets: Ticket[], room: Room): void {
    this.tickets = tickets;
    const { width } = room;
    this.setGridStyle(width);
  }

  private setGridStyle(width: number): void {
    this.styleGrid = `display: grid; grid-template-columns: repeat(${width}, 1fr); gap: 2rem`;
  }

  private updateCapacityAndSeatsFormValues(): void {
    // const capacityControl = this.form.get('capacity');
    // const seatsControl = this.form.get('seats');
    // if (capacityControl) capacityControl.setValue(this.getCountSeat());
    // if (seatsControl) seatsControl.setValue(this.seats);
  }

  protected toggleSeatDisabledStatus(seat: any): void {
    // const { number } = seat;
    // const targetSeat = this.seats.find((elem: any) => elem.number == number);
    // if (targetSeat) targetSeat.disabled = !targetSeat.disabled;
    // this.updateCapacityAndSeatsFormValues();
  }

  protected getCountSeat(): number {
    return 0;
    // return this.seats.filter((elem: any) => !elem.disabled).length;
  }
}
