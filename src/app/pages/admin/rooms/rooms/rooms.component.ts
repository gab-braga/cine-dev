import { Component, OnInit } from '@angular/core';
import { LayoutComponent } from '../../../../components/layout/layout.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { RouterLink } from '@angular/router';
import { Room } from '../../../../interfaces/room';
import { RoomService } from '../../../../services/room.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [
    LayoutComponent,
    ButtonModule,
    RouterLink,
    TableModule,
    ReactiveFormsModule,
  ],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css',
})
export class RoomsControlComponent implements OnInit {
  protected rooms: Room[] = [];
  protected formFilter: FormGroup = this.fb.group({ number: [''] });

  constructor(private fb: FormBuilder, private roomService: RoomService) {}

  public ngOnInit(): void {
    this.loadData();
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
}
