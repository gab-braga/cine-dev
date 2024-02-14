import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';
import { HourPipe } from '../../../pipes/hour.pipe';
import { Ticket } from '../../../interfaces/ticket';
import { TicketService } from '../../../services/ticket.service';

@Component({
  selector: 'modal-tickets',
  standalone: true,
  imports: [DialogModule, ButtonModule, DatePipe, HourPipe],
  templateUrl: './modal-tickets.component.html',
  styleUrl: './modal-tickets.component.css',
})
export class ModalTicketsComponent implements OnChanges {
  @Input({ required: true })
  reservation: any;
  @Input()
  visible: boolean = false;
  @Output()
  visibleChange = new EventEmitter<boolean>();
  protected tickets: Ticket[] = [];

  constructor(
    private messageService: MessageService,
    private ticketService: TicketService
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    const reservation = changes['reservation'];
    if (reservation.currentValue) this.loadTickets();
  }

  protected changeVisibilityModal(visible: boolean): void {
    this.visibleChange.emit(visible);
    if (!visible) this.reservation = null;
  }

  private loadTickets(): void {
    const { uuid } = this.reservation;
    this.ticketService.findByReservationId(uuid).subscribe((tickets) => {
      this.tickets = tickets;
    });
  }
}
