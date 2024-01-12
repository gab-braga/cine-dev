import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagUserComponent } from '../../../components/tag-user/tag-user.component';
import { ModalUserComponent } from '../../../components/modal/user/user.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [TableModule, ButtonModule, TagUserComponent, ModalUserComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  // Importante: Esta é apenas uma simulação para ilustração. Em um ambiente real, esses dados seriam provenientes de um banco de dados ou de outra fonte de dados.
  visible: boolean = false;
  user: any = null;

  openModalUser(user: any): void {
    this.visible = true;
    this.user = user;
  }

  closeModalUser(value: boolean) {
    this.visible = value;
    if (!value) this.user = null;
  }

  users = [
    {
      uuid: '1',
      name: 'Francisco Gabriel Braga do Nascimento',
      email: 'usuario1@example.com',
      password: 'senha123',
      cpf: '12345678901',
      phoneNumber: '123-456-7890',
      profilePicture: 'https://avatars.githubusercontent.com/u/66652642?v=4',
      disabled: false,
      confirmed: true,
      role: 'CLIENT',
      createdAt: '2022-01-01T00:00:00',
    },
    {
      uuid: '2',
      name: 'Usuário 2',
      email: 'usuario2@example.com',
      password: 'senha456',
      cpf: '23456789012',
      phoneNumber: '234-567-8901',
      profilePicture: 'https://avatars.githubusercontent.com/u/66652642?v=4',
      disabled: true,
      confirmed: true,
      role: 'CLIENT',
      createdAt: '2022-01-02T00:00:00',
    },
    {
      uuid: '3',
      name: 'Usuário 3',
      email: 'usuario3@example.com',
      password: 'senha789',
      cpf: '34567890123',
      phoneNumber: '345-678-9012',
      profilePicture: 'https://avatars.githubusercontent.com/u/66652642?v=4',
      disabled: false,
      confirmed: true,
      role: 'CLIENT',
      createdAt: '2022-01-03T00:00:00',
    },
    {
      uuid: '4',
      name: 'Usuário 4',
      email: 'usuario4@example.com',
      password: 'senhaABC',
      cpf: '45678901234',
      phoneNumber: '456-789-0123',
      profilePicture: 'https://avatars.githubusercontent.com/u/66652642?v=4',
      disabled: false,
      confirmed: true,
      role: 'CLIENT',
      createdAt: '2022-01-04T00:00:00',
    },
    {
      uuid: '5',
      name: 'Usuário 5',
      email: 'usuario5@example.com',
      password: 'senhaDEF',
      cpf: '56789012345',
      phoneNumber: '567-890-1234',
      profilePicture: 'https://avatars.githubusercontent.com/u/66652642?v=4',
      disabled: false,
      confirmed: true,
      role: 'CLIENT',
      createdAt: '2022-01-05T00:00:00',
    },
    {
      uuid: '6',
      name: 'Usuário 6',
      email: 'usuario6@example.com',
      password: 'senhaGHI',
      cpf: '67890123456',
      phoneNumber: '678-901-2345',
      profilePicture: 'https://avatars.githubusercontent.com/u/66652642?v=4',
      disabled: false,
      confirmed: true,
      role: 'CLIENT',
      createdAt: '2022-01-06T00:00:00',
    },
    {
      uuid: '7',
      name: 'Usuário 7',
      email: 'usuario7@example.com',
      password: 'senhaJKL',
      cpf: '78901234567',
      phoneNumber: '789-012-3456',
      profilePicture: 'https://avatars.githubusercontent.com/u/66652642?v=4',
      disabled: false,
      confirmed: true,
      role: 'CLIENT',
      createdAt: '2022-01-07T00:00:00',
    },
    {
      uuid: '8',
      name: 'Usuário 8',
      email: 'usuario8@example.com',
      password: 'senhaMNO',
      cpf: '89012345678',
      phoneNumber: '890-123-4567',
      profilePicture: 'https://avatars.githubusercontent.com/u/66652642?v=4',
      disabled: false,
      confirmed: true,
      role: 'CLIENT',
      createdAt: '2022-01-08T00:00:00',
    },
    {
      uuid: '9',
      name: 'Usuário 9',
      email: 'usuario9@example.com',
      password: 'senhaPQR',
      cpf: '90123456789',
      phoneNumber: '901-234-5678',
      profilePicture: 'https://avatars.githubusercontent.com/u/66652642?v=4',
      disabled: true,
      confirmed: true,
      role: 'CLIENT',
      createdAt: '2022-01-09T00:00:00',
    },
    {
      uuid: '10',
      name: 'Usuário 10',
      email: 'usuario10@example.com',
      password: 'senhaSTU',
      cpf: '01234567890',
      phoneNumber: '012-345-6789',
      profilePicture: 'https://avatars.githubusercontent.com/u/66652642?v=4',
      disabled: false,
      confirmed: true,
      role: 'CLIENT',
      createdAt: '2022-01-10T00:00:00',
    },
  ];
}
