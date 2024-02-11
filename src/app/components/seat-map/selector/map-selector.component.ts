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
import { Map } from '../../../interfaces/map';
import { MapService } from '../../../services/map.service';
import { Area } from '../../../interfaces/area';
import { TicketService } from '../../../services/ticket.service';
import { Ticket } from '../../../interfaces/ticket';

type SeatSelection = {
  selected: boolean;
  area: Area;
  ticket: Ticket;
};

@Component({
  selector: 'c-seat-map-selector',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, NgClass, ReactiveFormsModule],
  templateUrl: './map-selector.component.html',
  styleUrl: './map-selector.component.css',
})
export class SeatMapSelectorComponent implements OnInit, OnDestroy {
  AREA_TYPE_SEAT: string = 'SEAT';
  AREA_TYPE_HALL_H: string = 'HALL_H';
  AREA_TYPE_HALL_V: string = 'HALL_V';
  AREA_TYPE_EMPTY: string = 'EMPTY';
  AREA_TYPE_OCUPIED: string = 'OCUPIED';
  AREA_TYPE_SELECTED: string = 'SELECTED';

  @Input()
  public form: FormGroup | undefined;

  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private mapService: MapService,
    private ticketService: TicketService
  ) {}

  protected selections: SeatSelection[][] = [];

  public ngOnInit(): void {
    this.initializeMap();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  public get tickets() {
    return (<FormGroup>this.form).get('tickets') as FormArray<FormGroup>;
  }

  private initializeMap(): void {
    this.subscriptions.push(
      this.route.params.subscribe((params) => {
        const uuid = params['uuid'];
        if (uuid) this.loadMap(uuid);
      })
    );
  }

  protected toggleReservation(selection: SeatSelection): void {
    if (selection.selected) {
      this.removeTicket(selection.ticket);
      selection.selected = false;
    } else {
      this.addTicket(selection.ticket);
      selection.selected = true;
    }
  }

  private addTicket(ticket: Ticket): void {
    this.tickets.push(this.createNewTicketForm(ticket));
  }

  private removeTicket(ticket: Ticket): void {
    const index = this.tickets.controls.findIndex((control) => {
      return (<FormControl>control.get('uuid')).value == ticket.uuid;
    });
    if (index != -1) this.tickets.removeAt(index);
  }

  private loadMap(uuid: string): void {
    this.mapService.findBySessionId(uuid).subscribe((map) => {
      this.initializeMapToSelect(map.width, map.height);
      this.setMap(map);
      this.ticketService.findBySessionId(uuid).subscribe((tickets) => {
        this.setTickets(tickets);
      });
    });
  }

  private initializeMapToSelect(width: number, height: number): void {
    this.selections = [];
    for (let y = 0; y < height; y++) {
      this.selections.push([]);
      for (let x = 0; x < width; x++) {
        this.selections[y].push(<SeatSelection>{
          selected: false,
          area: <Area>{
            indexInX: x,
            indexInY: y,
            number: 0,
            areaType: this.AREA_TYPE_SEAT,
          },
        });
      }
    }
  }

  private setMap(map: Map): void {
    map.areas.forEach((area) => {
      const y = area.indexInY,
        x = area.indexInX;
      this.selections[y][x].area = area;
    });
  }

  private setTickets(tickets: Ticket[]): void {
    tickets.forEach((ticket) => {
      const y = ticket.area.indexInY,
        x = ticket.area.indexInX;
      const selection = this.selections[y][x];
      selection.ticket = ticket;
      if (ticket.reservation) {
        selection.area.areaType = this.AREA_TYPE_OCUPIED;
      }
    });
  }

  private createNewTicketForm(ticket: Ticket): FormGroup {
    return this.fb.group({
      uuid: [ticket.uuid, [Validators.required]],
    });
  }
}
