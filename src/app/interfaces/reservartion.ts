import { Session } from './session';
import { Ticket } from './ticket';
import { User } from './user';

export interface Reservation {
  uuid: string;
  reservedAt: Date;
  status: string;
  user: User;
  session: Session;
  tickets: Ticket[];
}
