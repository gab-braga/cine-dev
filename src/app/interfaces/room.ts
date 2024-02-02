import { Map } from './map';

export interface Room {
  uuid: string;
  number: number;
  capacity: number;
  projectionType: string;
  map: Map;
}
