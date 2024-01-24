import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ButtonModule } from 'primeng/button';
import { SessionDayComponent } from '../../components/session-day/session-day.component';
import { SessionCardComponent } from '../../components/session-card/session-card.component';

const NUMBER_OF_SESSIONS_SHORTCUTS = 14;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    HeaderComponent,
    FooterComponent,
    ButtonModule,
    SessionDayComponent,
    SessionCardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  protected sessionsDay: Date[] = [];

  public ngOnInit(): void {
    this.initilizeSessionDays();
  }

  private initilizeSessionDays(): void {
    for (let i = 0; i < NUMBER_OF_SESSIONS_SHORTCUTS; i++) {
      this.sessionsDay[i] = new Date(Date.now() + i * 86400000);
    }
  }
}
