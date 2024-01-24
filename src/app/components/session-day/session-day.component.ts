import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'c-session-day',
  standalone: true,
  imports: [],
  templateUrl: './session-day.component.html',
  styleUrl: './session-day.component.css',
})
export class SessionDayComponent implements OnInit {
  @Input()
  public day: Date = new Date();

  protected dayOfWeek: string = '';
  protected dayOfMonth: number = 0;
  protected month: number = 0;

  public ngOnInit(): void {
    this.extractValuesOfDay();
  }

  private extractValuesOfDay(): void {
    this.dayOfMonth = this.day.getDate();
    this.month = this.day.getMonth() + 1;
    this.dayOfWeek = this.day
      .toLocaleDateString('pt-BR', {
        weekday: 'long',
      })
      .split('-')[0];
  }
}
