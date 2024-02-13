import { Component, OnDestroy, OnInit } from '@angular/core';
import { LayoutComponent } from '../../../components/layout/layout.component';
import { Film } from '../../../interfaces/film';
import { FilmService } from '../../../services/film.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FilmCardComponent } from '../../../components/film-card/film-card.component';
import { DatePipe } from '@angular/common';
import { Session } from '../../../interfaces/session';
import { SessionCardComponent } from '../../../components/session-card/session-card.component';
import { SessionService } from '../../../services/session.service';
import { TimePipe } from '../../../pipes/time.pipe';

@Component({
  selector: 'app-film',
  standalone: true,
  imports: [
    LayoutComponent,
    ButtonModule,
    RouterLink,
    FilmCardComponent,
    SessionCardComponent,
    DatePipe,
    TimePipe,
  ],
  templateUrl: './film.component.html',
  styleUrl: './film.component.css',
})
export class FilmComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  protected film: Film | undefined;
  protected sessions: Session[] = [];
  protected films: Film[] = [];

  constructor(
    private route: ActivatedRoute,
    private filmService: FilmService,
    private sessionService: SessionService
  ) {}

  public ngOnInit(): void {
    this.loadData();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  private loadData(): void {
    this.subscriptions.push(
      this.route.params.subscribe((params) => {
        const uuid: string = params['uuid'];
        this.filmService.findByIdForClient(uuid).subscribe((film) => {
          this.film = film;
          const genres = this.extractFirstGenre(film?.genres);
          this.loadFilmsByGenres(genres);
          this.loadSessionsByFilm(uuid);
        });
      })
    );
  }

  private loadFilmsByGenres(genres: string): void {
    this.filmService.findByGenresForClient(genres).subscribe((films) => {
      this.films = films;
    });
  }

  private loadSessionsByFilm(uuid: string): void {
    this.sessionService.findByFilmId(uuid).subscribe((sessions) => {
      this.sessions = sessions;
    });
  }

  private extractFirstGenre(text: string): string {
    return text.split(', ')[0];
  }
}
