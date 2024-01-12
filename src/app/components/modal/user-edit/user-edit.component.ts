import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'modal-user-edit',
  standalone: true,
  imports: [ButtonModule, DialogModule],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css',
})
export class ModalUserEditComponent {
  @Input()
  visible: boolean = false;
  @Output()
  visibleChange = new EventEmitter<boolean>();
  @Input({ required: true })
  user: any = null;

  closeModal(value: boolean): void {
    this.visible = value;
    this.visibleChange.emit(value);
    if (!value) this.user = null;
  }
}
