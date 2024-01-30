import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { LayoutComponent } from '../../components/layout/layout.component';
import { Session } from '../../interfaces/session';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SessionService } from '../../services/session.service';
import { SessionDayComponent } from '../../components/session-day/session-day.component';
import { SessionCardComponent } from '../../components/session-card/session-card.component';
import { InputTextModule } from 'primeng/inputtext';
import { ActivatedRoute, Router } from '@angular/router';

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

  protected formSearch: FormGroup = this.fb.group({
    title: [''],
    date: [''],
  });

  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.initilizeSessionDays();
    this.loadData();
  }

  protected submitSearch(): void {
    const params = this.formSearch.value;
    this.router.navigate(['/sessions', params]);
  }

  protected clearFilter(): void {
    this.formSearch.reset();
    this.loadData();
  }

  private initilizeSessionDays(): void {
    for (let i = 0; i < NUMBER_OF_SESSIONS_SHORTCUTS; i++) {
      this.sessionsDay[i] = new Date(Date.now() + i * 86400000);
    }
  }

  private loadData(): void {
    this.route.params.subscribe((params) => {
      const filter = params;
      this.sessionService.findNearby(filter).subscribe((sessions) => {
        this.sessions = sessions;
      });
    });
  }
}
