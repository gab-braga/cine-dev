import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TagUserComponent } from '../../../../tag-user/tag-user.component';
import { ModalUserEditComponent } from '../user-edit/user-edit.component';
import { DatePipe } from '@angular/common';
import { UserService } from '../../../../../services/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'modal-user-info',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    TagUserComponent,
    ModalUserEditComponent,
    DatePipe,
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
  visibleModalUserEdit: boolean = false;

  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) {}

  protected handleVisibleChange(visible: boolean): void {
    this.visibleChange.emit(visible);
    if (!visible) this.user = null;
  }

  protected openModalUserEdit(): void {
    this.visibleModalUserEdit = true;
  }

  protected handleVisibleChangeUserEdit(value: boolean): void {
    this.visibleModalUserEdit = value;
  }

  protected disableUser(user: any): void {
    const uuid: string = user.uuid;
    this.userService.disable(uuid).subscribe({
      next: () => {
        this.handleVisibleChange(false);
        this.userService.notifyUsersModified();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'ERRO',
          detail: 'Algo deu errado. Tente mais tarde.',
        });
      },
    });
  }

  protected enableUser(user: any): void {
    const uuid: string = user.uuid;
    this.userService.enable(uuid).subscribe({
      next: () => {
        this.handleVisibleChange(false);
        this.userService.notifyUsersModified();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'ERRO',
          detail: 'Algo deu errado. Tente mais tarde.',
        });
      },
    });
  }
}
