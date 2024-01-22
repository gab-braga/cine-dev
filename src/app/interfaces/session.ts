import { Film } from './film';
import { Room } from './room';
import { Ticket } from './ticket';

export interface Session {
  uuid: string;
  date: Date;
  hour: string;
  open: boolean;
  ticketPrice: number;
  numberFreeSeats: number;
  film: Film;
  room: Room;
  tickets: Ticket[];
  filmId: string;
  roomId: string;
}
