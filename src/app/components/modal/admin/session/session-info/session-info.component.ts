import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ModalSessionEditComponent } from '../session-edit/session-edit.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'modal-session-info',
  standalone: true,
  imports: [DialogModule, ButtonModule, ModalSessionEditComponent, DatePipe],
  templateUrl: './session-info.component.html',
  styleUrl: './session-info.component.css',
})
export class ModalSessionInfoComponent {
  @Input({ required: true })
  session: any;
  @Input()
  visible: boolean = false;
  @Output()
  visibleChange = new EventEmitter<boolean>();

  closeModal(visible: boolean): void {
    this.visibleChange.emit(visible);
    if (!visible) this.session = null;
  }

  visibleModalSessionEdit: boolean = false;

  openModalSessionEdit(): void {
    this.visibleModalSessionEdit = true;
  }

  closeModalSessionEdit(value: boolean): void {
    this.visibleModalSessionEdit = value;
  }
}
