import { Component } from '@angular/core';

@Component({
  selector: 'c-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isAdmin: boolean = true;
}
