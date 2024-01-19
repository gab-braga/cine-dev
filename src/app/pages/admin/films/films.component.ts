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
  film: Film | null = null;
  films: Film[] = [];
  visibleModalFilmInfo: boolean = false;
  visibleModalFilmCreate: boolean = false;
  private subscriptions: Subscription[] = [];

  protected formFilter: FormGroup = this.fb.group({
    title: [''],
    genres: [''],
  });

  constructor(private fb: FormBuilder, private filmService: FilmService) {}

  public ngOnInit(): void {
    this.subscriptions.push(
      this.filmService.getListenerFilmsModified().subscribe(() => {
        this.initializeTable();
      })
    );
    this.filmService.notifyFilmsModified();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  protected onSubmit(): void {
    const filter = this.formFilter.value;
    this.filmService.findAll(filter).subscribe((films) => {
      this.films = films;
    });
  }

  protected clearFilter(): void {
    this.formFilter.reset();
    this.initializeTable();
  }

  protected openModalFilmInfo(film: any): void {
    this.visibleModalFilmInfo = true;
    this.film = film;
  }

  protected closeModalFilmInfo(value: boolean) {
    this.visibleModalFilmInfo = value;
    if (!value) this.film = null;
  }

  protected openModalFilmCreate(): void {
    this.visibleModalFilmCreate = true;
  }

  protected closeModalFilmCreate(value: boolean) {
    this.visibleModalFilmCreate = value;
  }

  private initializeTable(): void {
    this.filmService.findAll().subscribe((films) => {
      this.films = films;
    });
  }
}
