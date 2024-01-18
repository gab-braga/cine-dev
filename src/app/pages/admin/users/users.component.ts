import { Component, OnInit } from '@angular/core';
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
export class UsersControlComponent implements OnInit {
  users: any = [];
  user: any = null;
  visibleModalUserInfo: boolean = false;
  visibleModalUserCreate: boolean = false;

  constructor(private userService: UserService) {}

  public ngOnInit(): void {
    this.userService.findAll().subscribe({
      next: (users) => {
        this.users = users;
      },
    });
  }

  openModalUserInfo(user: any): void {
    this.visibleModalUserInfo = true;
    this.user = user;
  }

  closeModalUserInfo(value: boolean) {
    this.visibleModalUserInfo = value;
    if (!value) this.user = null;
  }

  openModalUserCreate(): void {
    this.visibleModalUserCreate = true;
  }

  closeModalUserCreate(value: boolean) {
    this.visibleModalUserCreate = value;
  }
}
