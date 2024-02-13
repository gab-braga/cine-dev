import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { UserService } from '../../../../../services/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'modal-user-edit',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, DialogModule],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css',
})
export class ModalUserEditComponent implements OnChanges {
  @Input()
  visible: boolean = false;
  @Output()
  visibleChange = new EventEmitter<boolean>();
  @Input({ required: true })
  user: any = null;

  protected formUserEditSubmitted: boolean = false;
  protected formUserEdit: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    email: ['', [Validators.required, Validators.email]],
    cpf: ['', [Validators.required]],
    role: ['', [Validators.required]],
    phoneNumber: [''],
    uuid: [''],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    const user = changes['user']?.currentValue;
    if (user) this.initializeForm(user);
  }

  protected get nameControl(): FormControl {
    return this.formUserEdit.get('name') as FormControl;
  }

  protected get cpfControl(): FormControl {
    return this.formUserEdit.get('cpf') as FormControl;
  }

  protected get roleControl(): FormControl {
    return this.formUserEdit.get('role') as FormControl;
  }

  protected get emailControl(): FormControl {
    return this.formUserEdit.get('email') as FormControl;
  }

  protected get passwordControl(): FormControl {
    return this.formUserEdit.get('password') as FormControl;
  }

  protected get phoneNumberControl(): FormControl {
    return this.formUserEdit.get('phoneNumber') as FormControl;
  }

  protected onSubmit(): void {
    this.formUserEditSubmitted = true;
    if (this.formUserEdit.valid) {
      const user = this.formUserEdit.value;
      const uuid: string = user.uuid || '';
      this.userService.update(uuid, user).subscribe({
        next: () => {
          this.changeVisibilityModal(false);
          this.userService.notifyChangesToUsersData();
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'ERRO',
            detail: 'Algo deu errado. Verifique o formato dos dados.',
          });
        },
      });
    }
  }

  protected changeVisibilityModal(visible: boolean): void {
    this.visible = visible;
    this.visibleChange.emit(visible);
  }

  private initializeForm(user: any): void {
    this.formUserEditSubmitted = false;
    this.formUserEdit.patchValue({
      name: user.name,
      email: user.email,
      cpf: user.cpf,
      role: user.role,
      phoneNumber: user.phoneNumber,
      uuid: user.uuid,
    });
  }
}
