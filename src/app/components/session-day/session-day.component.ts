import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'c-session-day',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './session-day.component.html',
  styleUrl: './session-day.component.css',
})
export class SessionDayComponent implements OnInit {
  @Input()
  public day: Date = new Date();

  protected dayOfWeek: string = '';
  protected dayOfMonth: string = '';
  protected month: string = '';

  constructor(private router: Router) {}

  public ngOnInit(): void {
    this.extractValuesOfDay();
  }

  private extractValuesOfDay(): void {
    this.dayOfMonth = String(this.day.getDate()).padStart(2, '0');
    this.month = String(this.day.getMonth() + 1).padStart(2, '0');
    this.dayOfWeek = this.day
      .toLocaleDateString('pt-BR', {
        weekday: 'long',
      })
      .split('-')[0];
  }

  protected redirectSession(): void {
    const params = { day: this.formatDate(this.day) };
    this.router.navigate(['/sessions', { queryParams: params }]);
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
