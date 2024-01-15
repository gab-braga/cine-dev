import { Component } from '@angular/core';
import { LayoutComponent } from '../../../components/layout/layout.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder } from '@angular/forms';
import { RoomComponent } from '../../../components/room/room.component';

@Component({
  selector: 'app-room-create',
  standalone: true,
  imports: [LayoutComponent, InputTextModule, RoomComponent],
  templateUrl: './room-create.component.html',
  styleUrl: './room-create.component.css',
})
export class RoomCreateComponent {
  formSubmitted: boolean = false;
  form: any = this.fb.group({});
  capacity: number = 0;

  constructor(private fb: FormBuilder) {}
}
