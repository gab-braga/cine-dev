import { SeatMapCreatorComponent } from '../../../../components/seat-map/creator/map-creator.component';
import { Component } from '@angular/core';
import { LayoutComponent } from '../../../../components/layout/layout.component';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-room-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LayoutComponent,
    RouterLink,
    InputTextModule,
    SeatMapCreatorComponent,
    ButtonModule,
  ],
  templateUrl: './room-create.component.html',
  styleUrl: './room-create.component.css',
})
export class RoomCreateComponent {
  formSubmitted: boolean = false;
  form: FormGroup = this.fb.group({
    number: ['', [Validators.required]],
    projectionType: ['', [Validators.required]],
    width: [12, [Validators.required]],
    height: [8, [Validators.required]],
    capacity: [24, [Validators.required]],
    seats: [[], [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}

  onSubmit(): void {
    this.formSubmitted = true;
    if (this.form.valid) console.log(this.form.value);
  }
}
