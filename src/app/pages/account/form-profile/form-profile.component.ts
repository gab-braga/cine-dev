import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'form-profile',
  standalone: true,
  imports: [InputTextModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './form-profile.component.html',
  styleUrl: './form-profile.component.css',
})
export class FormProfileComponent implements OnInit {
  protected formSubmitted: boolean = false;
  protected form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    email: ['', [Validators.required, Validators.email]],
    cpf: ['', [Validators.required]],
    phoneNumber: [''],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.loadData();
  }

  protected get nameControl(): FormControl {
    return this.form.get('name') as FormControl;
  }

  protected get emailControl(): FormControl {
    return this.form.get('email') as FormControl;
  }

  protected get cpfControl(): FormControl {
    return this.form.get('cpf') as FormControl;
  }

  protected get phoneNumberControl(): FormControl {
    return this.form.get('phoneNumber') as FormControl;
  }

  private loadData(): void {
    const { uuid } = this.authService.getAuthUser();
    this.userService.findByIdForClient(uuid).subscribe((user) => {
      this.form.patchValue({
        name: user.name,
        email: user.email,
        cpf: user.cpf,
        phoneNumber: user.phoneNumber,
      });
    });
  }

  protected onSubmit(): void {
    this.formSubmitted = true;
    if (this.form.valid) {
      const user = this.form.value;
      const { uuid } = this.authService.getAuthUser();
      this.userService.updateProfile(uuid, user).subscribe({
        next: () => {
          this.logout();
          this.messageService.add({
            summary: 'FEITO',
            severity: 'success',
            detail: 'Perfil atualizado.',
          });
        },
        error: () => {
          this.messageService.add({
            summary: 'ERRO',
            severity: 'error',
            detail: 'Algo deu errado.',
          });
        },
      });
    }
  }

  private logout(): void {
    setTimeout(() => {
      this.authService.logout();
      this.router.navigate(['/auth/login']);
    }, 2000);
  }
}
