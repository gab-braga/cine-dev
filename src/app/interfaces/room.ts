import { MapCell } from './cell';

export interface Room {
  uuid: string;
  number: number;
  width: number;
  height: number;
  capacity: number;
  projectionType: string;
  seats: MapCell[];
}
