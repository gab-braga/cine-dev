import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
  standalone: true,
})
export class TimePipe implements PipeTransform {
  transform(value: number | undefined, ...args: unknown[]): string | undefined {
    if (value) {
      const hour = Math.floor(value / 60);
      const minutes = value % 60;
      return `${hour}h${minutes}m`;
    }
    return undefined;
  }
}
