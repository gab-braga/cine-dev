import { Component, OnDestroy, OnInit } from '@angular/core';
import { LayoutComponent } from '../../../components/layout/layout.component';
import { Film } from '../../../interfaces/film';
import { FilmService } from '../../../services/film.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-film',
  standalone: true,
  imports: [LayoutComponent, ButtonModule, RouterLink],
  templateUrl: './film.component.html',
  styleUrl: './film.component.css',
})
export class FilmComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  protected film: Film | null = null;

  constructor(
    private route: ActivatedRoute,
    private filmService: FilmService
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
        });
      })
    );
  }
}
