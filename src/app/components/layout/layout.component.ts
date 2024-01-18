import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'c-layout',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ToastModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {}
