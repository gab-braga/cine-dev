import { SeatMapSelectorComponent } from '../../../components/seat-map/selector/map-selector.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LayoutComponent } from '../../../components/layout/layout.component';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReservationService } from '../../../services/reservation.service';
import { MessageService } from 'primeng/api';
import { Session } from '../../../interfaces/session';
import { Subscription } from 'rxjs';
import { HourPipe } from '../../../pipes/hour.pipe';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { SessionService } from '../../../services/session.service';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LayoutComponent,
    RouterLink,
    InputTextModule,
    SeatMapSelectorComponent,
    ButtonModule,
    DatePipe,
    HourPipe,
  ],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css',
})
export class TicketsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  protected session: Session | null = null;
  formSubmitted: boolean = false;
  form: FormGroup = this.fb.group({
    userId: [null, [Validators.required]],
    sessionId: [null, [Validators.required]],
    tickets: [null, [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private sessionService: SessionService,
    private reservationService: ReservationService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  public ngOnInit(): void {
    this.loadUserAndSessionDataInForm();
    this.loadData();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  private loadData(): void {
    this.subscriptions.push(
      this.route.params.subscribe((parms) => {
        const uuid = parms['uuid'];
        this.sessionService.findByIdForClient(uuid).subscribe((session) => {
          this.session = session;
        });
      })
    );
  }

  private loadUserAndSessionDataInForm(): void {
    this.subscriptions.push(
      this.route.params.subscribe((parms) => {
        const sessionId = parms['uuid'];
        const userId = this.authService.getAuthUser().uuid;
        this.form.patchValue({ sessionId, userId });
      })
    );
  }

  protected onSubmit(): void {
    this.formSubmitted = true;
    if (this.form.valid) {
      const reservation = this.form.value;
      this.reservationService.create(reservation).subscribe({
        next: () => {
          this.router.navigate(['/sessions']);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'ERRO',
            detail: 'Algo deu errado. Selecione poltronas disponíveis.',
          });
        },
      });
    }
  }
}