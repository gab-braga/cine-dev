import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { LayoutComponent } from '../../components/layout/layout.component';
import { Session } from '../../interfaces/session';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { SessionService } from '../../services/session.service';
import { SessionDayComponent } from '../../components/session-day/session-day.component';
import { SessionCardComponent } from '../../components/session-card/session-card.component';
import { InputTextModule } from 'primeng/inputtext';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, debounceTime } from 'rxjs';

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
  private subscriptions: Subscription[] = [];
  private sessions: Session[] = [];
  protected sessionsFiltered: Session[] = [];
  protected sessionsDay: Date[] = [];

  protected formControlForTitle: FormControl = new FormControl('');

  constructor(
    private sessionService: SessionService,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.synchronizeFormWithAutomaticQuery();
    this.initilizeSessionDays();
    this.loadData();
  }

  private initilizeSessionDays(): void {
    for (let i = 0; i < NUMBER_OF_SESSIONS_SHORTCUTS; i++) {
      this.sessionsDay[i] = new Date(Date.now() + i * 86400000);
    }
  }

  private synchronizeFormWithAutomaticQuery(): void {
    this.formControlForTitle.valueChanges
      .pipe(debounceTime(200))
      .subscribe((title) => {
        this.findByTitle(title || '');
      });
  }

  private findByTitle(title: string): void {
    const lowercasedTitle = title.toLowerCase();
    this.sessionsFiltered = this.sessions.filter((session) =>
      session?.film?.title?.toLowerCase().includes(lowercasedTitle)
    );
  }

  private loadData(): void {
    this.subscriptions.push(
      this.route.queryParamMap.subscribe((params) => {
        const date = params.get('date') || '';
        this.sessionService.findRecent({ date }).subscribe((sessions) => {
          this.intializeData(sessions);
        });
      })
    );
  }

  private intializeData(sessions: Session[]): void {
    this.formControlForTitle.reset();
    this.sessions = sessions;
    this.sessionsFiltered = sessions;
  }
}
