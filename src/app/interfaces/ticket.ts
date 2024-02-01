import { Reservation } from './reservartion';
import { Seat } from './seat';
import { Session } from './session';

export interface Ticket {
  uuid: string;
  gap: boolean;
  seat: Seat;
  session: Session;
  reservation: Reservation;
}
