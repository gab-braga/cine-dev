import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TagUserComponent } from '../../tag-user/tag-user.component';
import { ModalUserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'modal-user-info',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    TagUserComponent,
    ModalUserEditComponent,
  ],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css',
})
export class ModalUserInfoComponent {
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

  visibleModalUserEdit: boolean = false;

  openModalUserEdit(): void {
    this.visibleModalUserEdit = true;
  }

  closeModalUserEdit(value: boolean): void {
    this.visibleModalUserEdit = value;
  }
}
