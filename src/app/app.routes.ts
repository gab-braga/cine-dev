import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UsersControlComponent } from './pages/admin/users/users.component';
import { FilmsControlComponent } from './pages/admin/films/films.component';
import { SessionsControlComponent } from './pages/admin/sessions/sessions.component';
import { RoomsControlComponent } from './pages/admin/rooms/rooms.component';
import { RoomCreateComponent } from './pages/admin/room-create/room-create.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    title: 'CineDev.com',
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
            title: 'Cadastro de Sala',
          },
        ],
      },
    ],
  },
];
