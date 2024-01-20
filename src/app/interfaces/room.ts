import { Seat } from './seat';

export interface Room {
  uuid: string;
  number: number;
  width: number;
  height: number;
  capacity: number;
  projectionType: string;
  seats: Seat[];
}
