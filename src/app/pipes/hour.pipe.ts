import { Pipe, PipeTransform } from '@angular/core';
import { min } from 'rxjs';

@Pipe({
  name: 'hour',
  standalone: true,
})
export class HourPipe implements PipeTransform {
  transform(value: string | undefined, ...args: string[]): string | undefined {
    if (value) {
      const parts = value.split(':');
      const hours = parts[0];
      const minutes = parts[1];
      return `${hours}:${minutes}`;
    }
    return undefined;
  }
}
