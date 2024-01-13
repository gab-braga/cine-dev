import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ModalSessionInfoComponent } from '../../../components/modal/admin/session/session-info/session-info.component';
import { ModalSessionCreateComponent } from '../../../components/modal/admin/session/session-create/session-create.component';
import { LayoutComponent } from '../../../components/layout/layout.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'page-sessions',
  standalone: true,
  imports: [
    LayoutComponent,
    TableModule,
    ButtonModule,
    ModalSessionInfoComponent,
    ModalSessionCreateComponent,
    DatePipe,
  ],
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.css',
})
export class SessionsControlComponent {
  session: any = null;
  visibleModalSessionInfo: boolean = false;
  visibleModalSessionCreate: boolean = false;

  openModalSessionInfo(session: any): void {
    this.visibleModalSessionInfo = true;
    this.session = session;
  }

  closeModalSessionInfo(value: boolean) {
    this.visibleModalSessionInfo = value;
    if (!value) this.session = null;
  }

  openModalSessionCreate(): void {
    this.visibleModalSessionCreate = true;
  }

  closeModalSessionCreate(value: boolean) {
    this.visibleModalSessionCreate = value;
  }

  // Importante: Esta é apenas uma simulação para ilustração. Em um ambiente real, esses dados seriam provenientes de um banco de dados ou de outra fonte de dados.
  sessions = [
    {
      uuid: '1',
      date: '2024-01-13',
      hour: '20:30:00',
      ticketPrice: 16.8,
      open: false,
      numberFreeSeats: 89,
      film: {
        uuid: 'ee8a775e-9cd8-4e2f-97ad-46b79452c9f1',
        title: 'Session 1',
        resume: 'This is the summary for Session 1',
        genres: 'Genre 1',
        duration: 120.0,
        coverImage:
          'https://i.pinimg.com/736x/c2/f9/e1/c2f9e1e37712d6195b34b19caa7d8de5.jpg',
        publishedIn: '2024-01-13',
      },
      room: {
        number: 123,
      },
    },
    {
      uuid: '3',
      date: '2024-01-13',
      hour: '20:30:00',
      ticketPrice: 16.8,
      open: true,
      numberFreeSeats: 89,
      film: {
        uuid: 'ee8a775e-9cd8-4e2f-97ad-46b79452c9f1',
        title: 'Session 1',
        resume: 'This is the summary for Session 1',
        genres: 'Genre 1',
        duration: 120.0,
        coverImage:
          'https://i.pinimg.com/736x/c2/f9/e1/c2f9e1e37712d6195b34b19caa7d8de5.jpg',
        publishedIn: '2024-01-13',
      },
      room: {
        number: 123,
      },
    },
    {
      uuid: '3',
      date: '2024-01-13',
      hour: '20:30:00',
      ticketPrice: 16.8,
      open: false,
      numberFreeSeats: 89,
      film: {
        uuid: 'ee8a775e-9cd8-4e2f-97ad-46b79452c9f1',
        title: 'Session 1',
        resume: 'This is the summary for Session 1',
        genres: 'Genre 1',
        duration: 120.0,
        coverImage:
          'https://i.pinimg.com/736x/c2/f9/e1/c2f9e1e37712d6195b34b19caa7d8de5.jpg',
        publishedIn: '2024-01-13',
      },
      room: {
        number: 123,
      },
    },
  ];
}
