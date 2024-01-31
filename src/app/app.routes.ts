import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UsersControlComponent } from './pages/admin/users/users.component';
import { FilmsControlComponent } from './pages/admin/films/films.component';
import { SessionsControlComponent } from './pages/admin/sessions/sessions.component';
import { RoomsControlComponent } from './pages/admin/rooms/rooms/rooms.component';
import { RoomCreateComponent } from './pages/admin/rooms/create/room-create.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { RoomEditComponent } from './pages/admin/rooms/edit/room-edit.component';
import { SessionsComponent } from './pages/sessions/sessions/sessions.component';
import { FilmComponent } from './pages/films/film/film.component';
import { FilmsComponent } from './pages/films/films/films.component';
import { SessionComponent } from './pages/sessions/session/session.component';
import { TicketsComponent } from './pages/sessions/tickets/tickets.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    title: 'CineDev.com',
  },
  {
    path: 'sessions',
    children: [
      {
        path: '',
        component: SessionsComponent,
        title: 'Sessões Abertas',
      },
      {
        path: ':uuid',
        children: [
          {
            path: '',
            component: SessionComponent,
            title: 'Detalhes da Sessão',
          },
          {
            path: 'tickets',
            component: TicketsComponent,
            title: 'Reservas Disponíveis',
            canActivate: [authGuard],
          },
        ],
      },
    ],
  },
  {
    path: 'films',
    children: [
      {
        path: '',
        component: FilmsComponent,
        title: 'Melhores Filmes',
      },
      {
        path: ':uuid',
        component: FilmComponent,
        title: 'Detalhes do Filme',
      },
    ],
  },
  {
    path: 'auth',
    children: [
      {
        path: '',
        component: LoginComponent,
        title: 'Login',
      },
      {
        path: 'login',
        component: LoginComponent,
        title: 'Login',
      },
      {
        path: 'signup',
        component: SignupComponent,
        title: 'Cadastre-se',
      },
    ],
  },
  {
    path: 'admin',
    canActivate: [authGuard, adminGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
        title: 'Painel de Controle',
      },
      {
        path: 'users',
        component: UsersControlComponent,
        title: 'Controle de Usuários',
      },
      {
        path: 'films',
        component: FilmsControlComponent,
        title: 'Controle de Filmes',
      },
      {
        path: 'sessions',
        component: SessionsControlComponent,
        title: 'Controle de Sessões',
      },
      {
        path: 'rooms',
        children: [
          {
            path: '',
            component: RoomsControlComponent,
            title: 'Controle de Salas',
          },
          {
            path: 'new',
            component: RoomCreateComponent,
            title: 'Nova Sala de Cinema',
          },
          {
            path: 'edit/:uuid',
            component: RoomEditComponent,
            title: 'Editar Sala de Cinema',
          },
        ],
      },
    ],
  },
];
