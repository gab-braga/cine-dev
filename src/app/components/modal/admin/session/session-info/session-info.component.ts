import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ModalSessionEditComponent } from '../session-edit/session-edit.component';
import { DatePipe } from '@angular/common';
import { TagSessionComponent } from '../../../../tag-session/tag-session.component';
import { SessionService } from '../../../../../services/session.service';
import { MessageService } from 'primeng/api';
import { HourPipe } from '../../../../../pipes/hour.pipe';

@Component({
  selector: 'modal-session-info',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    TagSessionComponent,
    ModalSessionEditComponent,
    DatePipe,
    HourPipe,
  ],
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
  protected visibilityEditModal: boolean = false;

  constructor(
    private sessionService: SessionService,
    private messageService: MessageService
  ) {}

  protected changeVisibilityModal(visible: boolean): void {
    this.visibleChange.emit(visible);
    if (!visible) this.session = null;
  }

  protected showEditModal(): void {
    this.visibilityEditModal = true;
  }

  protected changeVisibilityEditModal(value: boolean): void {
    this.visibilityEditModal = value;
  }

  protected closeSession(session: any): void {
    const uuid: string = session.uuid;
    this.sessionService.close(uuid).subscribe({
      next: () => {
        this.changeVisibilityModal(false);
        this.sessionService.notifyChangesToSessionsData();
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

  protected openSession(session: any): void {
    const uuid: string = session.uuid;
    this.sessionService.open(uuid).subscribe({
      next: () => {
        this.changeVisibilityModal(false);
        this.sessionService.notifyChangesToSessionsData();
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
