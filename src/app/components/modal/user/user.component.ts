import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'modal-user',
  standalone: true,
  imports: [DialogModule, ButtonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class ModalUserComponent {
  @Input({ required: true })
  user: any;
  @Input()
  visible: boolean = false;
  @Output()
  visibleChange = new EventEmitter<boolean>();

  closeModal(value: boolean): void {
    this.visibleChange.emit(value);
    if (!value) this.user = null;
  }
}
