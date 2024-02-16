import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ModalFilmInfoComponent } from '../../../components/modal/admin/film/film-info/film-info.component';
import { ModalFilmCreateComponent } from '../../../components/modal/admin/film/film-create/film-create.component';
import { LayoutComponent } from '../../../components/layout/layout.component';
import { DatePipe } from '@angular/common';
import { Film } from '../../../interfaces/film';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FilmService } from '../../../services/film.service';

@Component({
  selector: 'page-films',
  standalone: true,
  imports: [
    LayoutComponent,
    TableModule,
    ButtonModule,
    ModalFilmInfoComponent,
    ModalFilmCreateComponent,
    ReactiveFormsModule,
    DatePipe,
  ],
  templateUrl: './films.component.html',
  styleUrl: './films.component.css',
})
export class FilmsControlComponent implements OnInit, OnDestroy {
  protected DEFAULT_COVER: string =
    'assets/images/placeholders/cover-image.jpg';
  film: Film | undefined;
  films: Film[] = [];
  visibilityInfoModal: boolean = false;
  visibleCreateModal: boolean = false;
  private subscriptions: Subscription[] = [];

  protected formFilter: FormGroup = this.fb.group({
    title: [''],
    genres: [''],
  });

  constructor(private fb: FormBuilder, private filmService: FilmService) {}

  public ngOnInit(): void {
    this.subscriptions.push(
      this.filmService.getListenerOfFilmsData().subscribe(() => {
        this.loadData();
      })
    );
    this.filmService.notifyChangesToFilmsData();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  protected submitFilter(): void {
    const filter = this.formFilter.value;
    this.filmService.findAll(filter).subscribe((films) => {
      this.films = films;
    });
  }

  protected clearFilter(): void {
    this.formFilter.reset();
    this.loadData();
  }

  protected showInfoModal(film: any): void {
    this.visibilityInfoModal = true;
    this.film = film;
  }

  protected changeVisibilityOfInfoModal(value: boolean) {
    this.visibilityInfoModal = value;
    if (!value) this.film = undefined;
  }

  protected showCreateModal(): void {
    this.visibleCreateModal = true;
  }

  protected changeVisibilityOfCreateModal(value: boolean) {
    this.visibleCreateModal = value;
  }

  private loadData(): void {
    this.filmService.findAll().subscribe((films) => {
      this.films = films;
    });
  }
}
