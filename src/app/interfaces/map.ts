import { Area } from './area';
import { Room } from './room';

export interface Map {
  uuid: string;
  width: number;
  height: number;
  room: Room;
  areas: Area[];
}
