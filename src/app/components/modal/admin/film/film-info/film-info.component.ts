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

  closeModal(visible: boolean): void {
    this.visibleChange.emit(visible);
    if (!visible) this.film = null;
  }

  visibleModalFilmEdit: boolean = false;

  openModalFilmEdit(): void {
    this.visibleModalFilmEdit = true;
  }

  closeModalFilmEdit(value: boolean): void {
    this.visibleModalFilmEdit = value;
  }
}
