import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LayoutComponent } from '../../../../components/layout/layout.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { RouterLink } from '@angular/router';
import { Room } from '../../../../interfaces/room';
import { RoomService } from '../../../../services/room.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ModalRoomEditComponent } from '../../../../components/modal/admin/room/room-edit/room-edit.component';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [
    LayoutComponent,
    ButtonModule,
    RouterLink,
    TableModule,
    ReactiveFormsModule,
    ModalRoomEditComponent,
  ],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css',
})
export class RoomsControlComponent implements OnInit, OnDestroy {
  room: Room | null = null;
  visibilityEditModal: boolean = false;
  private subscriptions: Subscription[] = [];

  protected rooms: Room[] = [];
  protected formFilter: FormGroup = this.fb.group({ number: [''] });

  constructor(private fb: FormBuilder, private roomService: RoomService) {}

  public ngOnInit(): void {
    this.subscriptions.push(
      this.roomService.getListenerOfRoomsData().subscribe(() => {
        this.loadData();
      })
    );
    this.roomService.notifyChangesToRoomsData();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  protected submitFilter(): void {
    const filter = this.formFilter.value;
    this.roomService.findAll(filter).subscribe((rooms) => {
      this.rooms = rooms;
    });
  }

  protected clearFilter(): void {
    this.formFilter.reset();
    this.loadData();
  }

  private loadData(): void {
    this.roomService.findAll().subscribe((rooms) => {
      this.rooms = rooms;
    });
  }

  protected showEditModal(room: any): void {
    this.visibilityEditModal = true;
    this.room = room;
  }

  protected changeVisibilityOfEditModal(value: boolean) {
    this.visibilityEditModal = value;
    if (!value) this.room = null;
  }
}
