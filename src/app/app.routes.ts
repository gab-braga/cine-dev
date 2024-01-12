import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserControlComponent } from './pages/admin/users/users.component';

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
        children: [
          {
            path: '',
            component: UserControlComponent,
            title: 'Controle de Usuários',
          },
        ],
      },
    ],
  },
];
