import { Component, OnDestroy, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { LayoutComponent } from '../../../components/layout/layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Subscription } from 'rxjs';
import { FilmCardComponent } from '../../../components/film-card/film-card.component';
import { AuthService } from '../../../services/auth.service';
import { ReservationService } from '../../../services/reservation.service';
import { Reservation } from '../../../interfaces/reservartion';
import { TableModule } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { HourPipe } from '../../../pipes/hour.pipe';
import { ModalTicketsComponent } from '../modal-tickets/modal-tickets.component';

@Component({
  selector: 'page-reservations',
  standalone: true,
  imports: [
    LayoutComponent,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    FilmCardComponent,
    TableModule,
    DatePipe,
    HourPipe,
    ModalTicketsComponent,
  ],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css',
})
export class ReservationsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  protected reservations: Reservation[] = [];
  protected reservation: Reservation | undefined;
  public visibilityTicketsModal: boolean = false;

  constructor(
    private authService: AuthService,
    private reservationService: ReservationService
  ) {}

  public ngOnInit(): void {
    this.loadData();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  private loadData(): void {
    const { uuid } = this.authService.getAuthUser();
    this.reservationService.findByUserId(uuid).subscribe((reservations) => {
      this.reservations = reservations;
    });
  }

  protected showTicketsModal(reservartion: any): void {
    this.visibilityTicketsModal = true;
    this.reservation = reservartion;
  }

  protected changeVisibilityOfTicketsModal(value: boolean) {
    this.visibilityTicketsModal = value;
    if (!value) this.reservation = undefined;
  }
}
