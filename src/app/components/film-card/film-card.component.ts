import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Film } from '../../interfaces/film';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'c-film-card',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './film-card.component.html',
  styleUrl: './film-card.component.css',
})
export class FilmCardComponent {
  @Input()
  film: Film | null = null;
}
