import { Reservation } from './reservartion';
import { Area } from './area';
import { Session } from './session';

export interface Ticket {
  uuid: string;
  status: string;
  seat: Area;
  session: Session;
  reservation: Reservation;
}
