import { Component } from '@angular/core';
import { LayoutComponent } from '../../../../components/layout/layout.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [LayoutComponent, ButtonModule, RouterLink, TableModule],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css',
})
export class RoomsControlComponent {
  rooms: any = [
    {
      uuid: 'ee8a775e-9cd8-4e2f-97ad-46b79452c9f1',
      number: 1,
      width: 12,
      height: 6,
      capacity: 72,
      projectionType: '2D',
    },
    {
      uuid: '3dc2e76b-6157-4e80-a71b-0f6f3abef036',
      number: 2,
      width: 12,
      height: 6,
      capacity: 72,
      projectionType: '2D',
    },
    {
      uuid: 'd69a2d14-5d72-4cf0-9dcd-4959d6c5c32b',
      number: 3,
      width: 12,
      height: 6,
      capacity: 72,
      projectionType: '2D',
    },
  ];
}
