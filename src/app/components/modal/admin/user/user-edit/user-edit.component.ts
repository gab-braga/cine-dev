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
  protected formUserEdit: FormGroup = this.fb.group(
    this.getUserFormGroup(this.user)
  );

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    this.initializeForm();
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
    if (!visible) this.user = null;
  }

  private initializeForm(): void {
    this.formUserEditSubmitted = false;
    this.formUserEdit = this.fb.group(this.getUserFormGroup(this.user));
  }

  private getUserFormGroup(user: any) {
    return {
      uuid: [user?.uuid || ''],
      name: [
        user?.name || '',
        [Validators.required, Validators.maxLength(120)],
      ],
      email: [user?.email || '', [Validators.required, Validators.email]],
      cpf: [user?.cpf || '', [Validators.required]],
      role: [user?.role || '', [Validators.required]],
      phoneNumber: [user?.phoneNumber || ''],
    };
  }
}
