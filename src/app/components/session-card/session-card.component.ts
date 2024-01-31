import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Session } from '../../interfaces/session';
import { DatePipe } from '@angular/common';
import { HourPipe } from '../../pipes/hour.pipe';

@Component({
  selector: 'c-session-card',
  standalone: true,
  imports: [RouterLink, DatePipe, HourPipe],
  templateUrl: './session-card.component.html',
  styleUrl: './session-card.component.css',
})
export class SessionCardComponent {
  @Input()
  session: Session | null = null;
}
