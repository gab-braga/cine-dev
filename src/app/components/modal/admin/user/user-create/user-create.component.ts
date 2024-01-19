import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { UserService } from '../../../../../services/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'modal-user-create',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, DialogModule],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css',
})
export class ModalUserCreateComponent implements OnChanges {
  @Input()
  visible: boolean = false;
  @Output()
  visibleChange = new EventEmitter<boolean>();

  protected formUserCreateSubmitted: boolean = false;
  protected formUserCreate = this.fb.group(this.getUserFormGroup());

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    this.initializeForm();
  }

  protected onSubmit(): void {
    this.formUserCreateSubmitted = true;
    if (this.formUserCreate.valid) {
      const user: any = this.formUserCreate.value;
      this.userService.create(user).subscribe({
        next: () => {
          this.handleVisibleChange(false);
          this.userService.notifyUsersModified();
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

  protected handleVisibleChange(visible: boolean): void {
    this.visible = visible;
    this.visibleChange.emit(visible);
  }

  private initializeForm(): void {
    this.formUserCreateSubmitted = false;
    this.formUserCreate = this.fb.group(this.getUserFormGroup());
  }

  private getUserFormGroup() {
    return {
      name: ['', [Validators.required, Validators.maxLength(120)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      role: ['', [Validators.required]],
      phoneNumber: [''],
    };
  }
}
