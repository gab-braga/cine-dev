import { Component, Input } from '@angular/core';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'tag-session',
  standalone: true,
  imports: [TagModule],
  templateUrl: './tag-session.component.html',
  styleUrl: './tag-session.component.css',
})
export class TagSessionComponent {
  @Input({ required: true })
  open: boolean = false;
  @Input({ required: false })
  styleClass: string = '';
}
