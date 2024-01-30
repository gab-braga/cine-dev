import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'c-session-day',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './session-day.component.html',
  styleUrl: './session-day.component.css',
})
export class SessionDayComponent implements OnInit {
  @Input()
  public day: Date = new Date();
  protected active: boolean = false;

  protected dayOfWeek: string = '';
  protected dayOfMonth: string = '';
  protected month: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.initializeDateProperties();
    this.initializeActiveProperty();
  }

  protected redirectSession(): void {
    let params = {};
    if (!this.active) params = { date: this.formatDate(this.day) };
    this.router.navigate(['/sessions'], { queryParams: params });
  }

  private initializeDateProperties(): void {
    this.dayOfMonth = String(this.day.getDate()).padStart(2, '0');
    this.month = String(this.day.getMonth() + 1).padStart(2, '0');
    this.dayOfWeek = this.day
      .toLocaleDateString('pt-BR', {
        weekday: 'long',
      })
      .split('-')[0];
  }

  private initializeActiveProperty(): void {
    this.route.queryParamMap.subscribe((params) => {
      const dateString = params.get('date');
      this.active = false;
      if (dateString) {
        const dateParam = this.toDate(dateString);
        const date = this.day;

        if (this.daysOfYearEquals(date, dateParam)) this.active = true;
      }
    });
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private toDate(dateString: string): Date {
    const parts = dateString.split('-');
    let year: number = Number(parts[0]);
    let month: number = Number(parts[1]);
    let day: number = Number(parts[2]);
    return new Date(year, --month, day);
  }

  private daysOfYearEquals(data1: Date, data2: Date): boolean {
    data1.setHours(0, 0, 0, 0);
    data2.setHours(0, 0, 0, 0);
    var tempo1 = data1.getTime();
    var tempo2 = data2.getTime();
    return tempo1 == tempo2;
  }
}
