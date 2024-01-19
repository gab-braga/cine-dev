import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagUserComponent } from '../../../components/tag-user/tag-user.component';
import { ModalUserInfoComponent } from '../../../components/modal/admin/user/user-info/user-info.component';
import { ModalUserCreateComponent } from '../../../components/modal/admin/user/user-create/user-create.component';
import { LayoutComponent } from '../../../components/layout/layout.component';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'page-users',
  standalone: true,
  imports: [
    LayoutComponent,
    TableModule,
    ButtonModule,
    TagUserComponent,
    ModalUserInfoComponent,
    ModalUserCreateComponent,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersControlComponent implements OnInit, OnDestroy {
  users: any = [];
  user: any = null;
  visibleModalUserInfo: boolean = false;
  visibleModalUserCreate: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(private userService: UserService) {}

  public ngOnInit(): void {
    this.subscriptions.push(
      this.userService.getListenerUsersModified().subscribe(() => {
        this.initializeTable();
      })
    );
    this.userService.notifyUsersModified();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  private initializeTable(): void {
    this.userService.findAll().subscribe((users) => {
      this.users = users;
    });
  }

  protected openModalUserInfo(user: any): void {
    this.visibleModalUserInfo = true;
    this.user = user;
  }

  protected handleVisibleModalUserInfo(value: boolean) {
    this.visibleModalUserInfo = value;
    if (!value) this.user = null;
  }

  protected openModalUserCreate(): void {
    this.visibleModalUserCreate = true;
  }

  protected handleVisibleModalUserCreate(value: boolean) {
    this.visibleModalUserCreate = value;
  }
}
