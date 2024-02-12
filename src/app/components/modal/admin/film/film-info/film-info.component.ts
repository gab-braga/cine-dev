import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ModalFilmEditComponent } from '../film-edit/film-edit.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'modal-film-info',
  standalone: true,
  imports: [DialogModule, ButtonModule, ModalFilmEditComponent, DatePipe],
  templateUrl: './film-info.component.html',
  styleUrl: './film-info.component.css',
})
export class ModalFilmInfoComponent {
  @Input({ required: true })
  film: any;
  @Input()
  visible: boolean = false;
  @Output()
  visibleChange = new EventEmitter<boolean>();
  protected visibilityEditModal: boolean = false;

  protected changeVisibilityModal(visible: boolean): void {
    this.visibleChange.emit(visible);
    if (!visible) this.film = null;
  }

  protected showEditModal(): void {
    this.visibilityEditModal = true;
  }

  changeVisibilityEditModal(value: boolean): void {
    this.visibilityEditModal = value;
  }
}
