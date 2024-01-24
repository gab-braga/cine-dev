import { Component, Input, OnInit } from '@angular/core';
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
export class HeaderComponent implements OnInit {
  @Input({ required: false })
  background: string = '#000000';
  @Input({ required: false })
  position: string = 'initial';
  isAdmin: boolean = false;
  isLogged: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  public ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.isLogged = this.authService.isLogged();
  }

  protected logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
