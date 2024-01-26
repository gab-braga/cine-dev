import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { LayoutComponent } from '../../components/layout/layout.component';
import { Session } from '../../interfaces/session';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SessionService } from '../../services/session.service';
import { SessionDayComponent } from '../../components/session-day/session-day.component';
import { SessionCardComponent } from '../../components/session-card/session-card.component';
import { InputTextModule } from 'primeng/inputtext';

const NUMBER_OF_SESSIONS_SHORTCUTS = 14;

@Component({
  selector: 'page-sessions',
  standalone: true,
  imports: [
    LayoutComponent,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    SessionDayComponent,
    SessionCardComponent,
  ],
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.css',
})
export class SessionsComponent implements OnInit {
  protected sessionsDay: Date[] = [];
  sessions: Session[] = [];

  protected formFilter: FormGroup = this.fb.group({
    title: [''],
    date: [''],
  });

  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService
  ) {}

  public ngOnInit(): void {
    this.initilizeSessionDays();
    this.loadData();
  }

  protected submitFilter(): void {
    const filter = this.formFilter.value;
    this.sessionService.findAll(filter).subscribe((sessions) => {
      this.sessions = sessions;
    });
  }

  protected clearFilter(): void {
    this.formFilter.reset();
    this.loadData();
  }

  private initilizeSessionDays(): void {
    for (let i = 0; i < NUMBER_OF_SESSIONS_SHORTCUTS; i++) {
      this.sessionsDay[i] = new Date(Date.now() + i * 86400000);
    }
  }

  private loadData(): void {
    this.sessionService.findNearby().subscribe((sessions) => {
      this.sessions = sessions;
    });
  }
}
