import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagUserComponent } from '../../../components/tag-user/tag-user.component';
import { ModalUserInfoComponent } from '../../../components/modal/admin/user/user-info/user-info.component';
import { ModalUserCreateComponent } from '../../../components/modal/admin/user/user-create/user-create.component';
import { LayoutComponent } from '../../../components/layout/layout.component';
import { UserService } from '../../../services/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'page-users',
  standalone: true,
  imports: [
    LayoutComponent,
    TableModule,
    ButtonModule,
    ReactiveFormsModule,
    TagUserComponent,
    ModalUserInfoComponent,
    ModalUserCreateComponent,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersControlComponent implements OnInit, OnDestroy {
  protected DEFAULT_PERSON: string = 'assets/images/placeholders/person.jpg';
  users: User[] = [];
  user: User | undefined;
  visibilityInfoModal: boolean = false;
  visibilityCreateModal: boolean = false;
  private subscriptions: Subscription[] = [];

  protected formFilter: FormGroup = this.fb.group({
    name: [''],
    email: [''],
    cpf: [''],
  });

  constructor(private fb: FormBuilder, private userService: UserService) {}

  public ngOnInit(): void {
    this.subscriptions.push(
      this.userService.getListenerOfUsersData().subscribe(() => {
        this.loadData();
      })
    );
    this.userService.notifyChangesToUsersData();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  protected submitFilter(): void {
    const filter = this.formFilter.value;
    this.userService.findAll(filter).subscribe((users) => {
      this.users = users;
    });
  }

  protected clearFilter(): void {
    this.formFilter.reset();
    this.loadData();
  }

  protected showInfoModal(user: User): void {
    this.visibilityInfoModal = true;
    this.user = user;
  }

  protected changeVisibilityOfInfoModal(value: boolean) {
    this.visibilityInfoModal = value;
    if (!value) this.user = undefined;
  }

  protected showCreateModal(): void {
    this.visibilityCreateModal = true;
  }

  protected changeVisibilityOfCreateModal(value: boolean) {
    this.visibilityCreateModal = value;
  }

  private loadData(): void {
    this.userService.findAll().subscribe((users) => {
      this.users = users;
    });
  }
}
