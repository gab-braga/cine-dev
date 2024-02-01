import { Reservation } from './reservartion';
import { MapCell } from './cell';
import { Session } from './session';

export interface Ticket {
  uuid: string;
  status: string;
  seat: MapCell;
  session: Session;
  reservation: Reservation;
}
