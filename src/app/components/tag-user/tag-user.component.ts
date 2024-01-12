import { Component, Input } from '@angular/core';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'tag-user',
  standalone: true,
  imports: [TagModule],
  templateUrl: './tag-user.component.html',
  styleUrl: './tag-user.component.css',
})
export class TagUserComponent {
  @Input({ required: true })
  disabled: boolean = false;
  @Input({ required: false })
  styleClass: string = '';
}
