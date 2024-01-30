import { Component, OnDestroy, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { LayoutComponent } from '../../components/layout/layout.component';
import { Film } from '../../interfaces/film';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FilmService } from '../../services/film.service';
import { InputTextModule } from 'primeng/inputtext';
import { Subscription, debounceTime } from 'rxjs';
import { FilmCardComponent } from '../../components/film-card/film-card.component';

@Component({
  selector: 'page-films',
  standalone: true,
  imports: [
    LayoutComponent,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    FilmCardComponent,
  ],
  templateUrl: './films.component.html',
  styleUrl: './films.component.css',
})
export class FilmsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  private films: Film[] = [];
  protected filmsFiltered: Film[] = [];

  protected formControlForTitle: FormControl = new FormControl('');

  constructor(private filmService: FilmService) {}

  public ngOnInit(): void {
    this.synchronizeFormWithAutomaticQuery();
    this.loadData();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  private synchronizeFormWithAutomaticQuery(): void {
    this.subscriptions.push(
      this.formControlForTitle.valueChanges
        .pipe(debounceTime(200))
        .subscribe((title) => {
          this.findByTitle(title || '');
        })
    );
  }

  private findByTitle(title: string): void {
    const lowercasedTitle = title.toLowerCase();
    this.filmsFiltered = this.films.filter((film) =>
      film?.title?.toLowerCase().includes(lowercasedTitle)
    );
  }

  private loadData(): void {
    this.filmService.findForClient().subscribe((films) => {
      this.intializeData(films);
    });
  }

  private intializeData(films: Film[]): void {
    this.formControlForTitle.reset();
    this.films = films;
    this.filmsFiltered = films;
  }
}
