import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'c-header',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input()
  protected transparent: boolean = false;
  isAdmin: boolean = true;

  constructor(private authService: AuthService, private router: Router) {}

  protected logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
