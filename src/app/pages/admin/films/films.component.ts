import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ModalFilmInfoComponent } from '../../../components/modal/admin/film/film-info/film-info.component';
import { ModalFilmCreateComponent } from '../../../components/modal/admin/film/film-create/film-create.component';
import { LayoutComponent } from '../../../components/layout/layout.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'page-films',
  standalone: true,
  imports: [
    LayoutComponent,
    TableModule,
    ButtonModule,
    ModalFilmInfoComponent,
    ModalFilmCreateComponent,
    DatePipe,
  ],
  templateUrl: './films.component.html',
  styleUrl: './films.component.css',
})
export class FilmsControlComponent {
  film: any = null;
  visibleModalFilmInfo: boolean = false;
  visibleModalFilmCreate: boolean = false;

  openModalFilmInfo(film: any): void {
    this.visibleModalFilmInfo = true;
    this.film = film;
  }

  closeModalFilmInfo(value: boolean) {
    this.visibleModalFilmInfo = value;
    if (!value) this.film = null;
  }

  openModalFilmCreate(): void {
    this.visibleModalFilmCreate = true;
  }

  closeModalFilmCreate(value: boolean) {
    this.visibleModalFilmCreate = value;
  }

  // Importante: Esta é apenas uma simulação para ilustração. Em um ambiente real, esses dados seriam provenientes de um banco de dados ou de outra fonte de dados.
  films = [
    {
      uuid: 'ee8a775e-9cd8-4e2f-97ad-46b79452c9f1',
      title: 'Film 1',
      resume: 'This is the summary for Film 1',
      genres: 'Genre 1',
      duration: 120.0,
      coverImage:
        'https://i.pinimg.com/736x/c2/f9/e1/c2f9e1e37712d6195b34b19caa7d8de5.jpg',
      publishedIn: '2024-01-13',
    },
    {
      uuid: '3dc2e76b-6157-4e80-a71b-0f6f3abef036',
      title: 'Film 2',
      resume: 'This is the summary for Film 2',
      genres: 'Genre 2',
      duration: 121.0,
      coverImage:
        'https://i.pinimg.com/736x/c2/f9/e1/c2f9e1e37712d6195b34b19caa7d8de5.jpg',
      publishedIn: '2024-01-12',
    },
    {
      uuid: 'd69a2d14-5d72-4cf0-9dcd-4959d6c5c32b',
      title: 'Film 3',
      resume: 'This is the summary for Film 3',
      genres: 'Genre 3',
      duration: 122.0,
      coverImage:
        'https://i.pinimg.com/736x/c2/f9/e1/c2f9e1e37712d6195b34b19caa7d8de5.jpg',
      publishedIn: '2024-01-11',
    },
    {
      uuid: 'a849792f-1a46-4ff7-bdcb-e7ac48f17e9f',
      title: 'Film 4',
      resume: 'This is the summary for Film 4',
      genres: 'Genre 1',
      duration: 123.0,
      coverImage:
        'https://i.pinimg.com/736x/c2/f9/e1/c2f9e1e37712d6195b34b19caa7d8de5.jpg',
      publishedIn: '2024-01-10',
    },
    {
      uuid: '1c0e136e-cf18-4f17-9f2b-4d7e40a67a50',
      title: 'Film 5',
      resume: 'This is the summary for Film 5',
      genres: 'Genre 2',
      duration: 124.0,
      coverImage:
        'https://i.pinimg.com/736x/c2/f9/e1/c2f9e1e37712d6195b34b19caa7d8de5.jpg',
      publishedIn: '2024-01-09',
    },
    {
      uuid: 'da38fc9d-3c5d-4095-b077-0e7f7ef33c65',
      title: 'Film 6',
      resume: 'This is the summary for Film 6',
      genres: 'Genre 3',
      duration: 125.0,
      coverImage:
        'https://i.pinimg.com/736x/c2/f9/e1/c2f9e1e37712d6195b34b19caa7d8de5.jpg',
      publishedIn: '2024-01-08',
    },
    {
      uuid: '3d1f824a-075e-48f5-9a6b-5f11b72a2b57',
      title: 'Film 7',
      resume: 'This is the summary for Film 7',
      genres: 'Genre 1',
      duration: 126.0,
      coverImage:
        'https://i.pinimg.com/736x/c2/f9/e1/c2f9e1e37712d6195b34b19caa7d8de5.jpg',
      publishedIn: '2024-01-07',
    },
    {
      uuid: 'e5a60946-4e1d-44a0-856c-8cc9294c0d0c',
      title: 'Film 8',
      resume: 'This is the summary for Film 8',
      genres: 'Genre 2',
      duration: 127.0,
      coverImage:
        'https://i.pinimg.com/736x/c2/f9/e1/c2f9e1e37712d6195b34b19caa7d8de5.jpg',
      publishedIn: '2024-01-06',
    },
    {
      uuid: 'f8f9c706-4e02-41a0-8b64-32c44a2d8d54',
      title: 'Film 9',
      resume: 'This is the summary for Film 9',
      genres: 'Genre 3',
      duration: 128.0,
      coverImage:
        'https://i.pinimg.com/736x/c2/f9/e1/c2f9e1e37712d6195b34b19caa7d8de5.jpg',
      publishedIn: '2024-01-05',
    },
    {
      uuid: 'a59bc9b4-9256-4d23-b4e1-98d5c6e1d9f1',
      title: 'Film 10',
      resume: 'This is the summary for Film 10',
      genres: 'Genre 1',
      duration: 129.0,
      coverImage:
        'https://i.pinimg.com/736x/c2/f9/e1/c2f9e1e37712d6195b34b19caa7d8de5.jpg',
      publishedIn: '2024-01-04',
    },
  ];
}
