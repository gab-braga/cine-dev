import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { Subscription } from 'rxjs';
import {
  FormArray,
  FormBuilder,
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

type AreaForm = {
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

  protected map: AreaForm[][] = [];

  public ngOnInit(): void {
    this.initializeMap();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  public get tickets() {
    return (<FormGroup>this.form).get('tickets') as FormArray<FormArray>;
  }

  protected toggleReservation(area: AreaForm): void {
    area.selected = !area.selected;
  }

  private initializeMap(): void {
    this.subscriptions.push(
      this.route.params.subscribe((params) => {
        const uuid = params['uuid'];
        if (uuid) this.loadMap(uuid);
      })
    );
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
    for (let y = 0; y < height; y++) {
      this.map.push([]);
      for (let x = 0; x < width; x++) {
        const position = y * width + x + 1;
        this.map[y].push(<AreaForm>{
          selected: false,
          area: <Area>{
            indexInX: x,
            indexInY: y,
            number: position,
            areaType: this.AREA_TYPE_SEAT,
          },
        });
      }
    }
  }

  private setMap(map: Map): void {
    map.areas.forEach((area) => {
      this.map[area.indexInY][area.indexInX].area = area;
    });
  }

  private setTickets(tickets: Ticket[]): void {
    tickets.forEach((ticket) => {
      if (ticket.reservation) {
        const areForm = this.map[ticket.area.indexInY][ticket.area.indexInX];
        areForm.area.areaType = this.AREA_TYPE_OCUPIED;
        areForm.ticket = ticket;
      }
    });
  }

  private createNewTicketForm(indexInX: number, indexInY: number): FormGroup {
    return this.fb.group({
      number: [null, [Validators.required]],
      areaType: [this.AREA_TYPE_SEAT, [Validators.required]],
      indexInX: [indexInX, [Validators.required, Validators.min(0)]],
      indexInY: [indexInY, [Validators.required, Validators.min(0)]],
    });
  }
}
