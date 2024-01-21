import { Reservation } from './reservartion';
import { Seat } from './seat';
import { Session } from './session';

export interface Ticket {
  uuid: string;
  status: string;
  seat: Seat;
  session: Session;
  reservation: Reservation;
}
