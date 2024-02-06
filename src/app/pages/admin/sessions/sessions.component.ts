import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ModalSessionInfoComponent } from '../../../components/modal/admin/session/session-info/session-info.component';
import { ModalSessionCreateComponent } from '../../../components/modal/admin/session/session-create/session-create.component';
import { LayoutComponent } from '../../../components/layout/layout.component';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { SessionService } from '../../../services/session.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Session } from '../../../interfaces/session';
import { TagSessionComponent } from '../../../components/tag-session/tag-session.component';
import { HourPipe } from '../../../pipes/hour.pipe';

@Component({
  selector: 'page-sessions',
  standalone: true,
  imports: [
    LayoutComponent,
    TableModule,
    ButtonModule,
    TagSessionComponent,
    ReactiveFormsModule,
    ModalSessionInfoComponent,
    ModalSessionCreateComponent,
    DatePipe,
    HourPipe,
  ],
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.css',
})
export class SessionsControlComponent {
  visibilityInfoModal: boolean = false;
  visibilityCreateModal: boolean = false;

  protected session: Session | null = null;
  protected sessions: Session[] = [];
  private subscriptions: Subscription[] = [];

  protected formFilter: FormGroup = this.fb.group({
    date: [''],
    title: [''],
    number: [''],
  });

  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService
  ) {}

  public ngOnInit(): void {
    this.subscriptions.push(
      this.sessionService.getListenerOfSessionsData().subscribe(() => {
        this.loadData();
      })
    );
    this.sessionService.notifyChangesToSessionsData();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  protected submitFilter(): void {
    const filter = this.formFilter.value;
    this.sessionService.findAll(filter).subscribe((sessions) => {
      this.sessions = sessions;
    });
  }

  protected clearFilter(): void {
    this.formFilter.reset();
    this.loadData();
  }

  protected showInfoModal(session: any): void {
    this.visibilityInfoModal = true;
    this.session = session;
  }

  protected changeVisibilityOfInfoModal(value: boolean) {
    this.visibilityInfoModal = value;
    if (!value) this.session = null;
  }

  protected showCreateModal(): void {
    this.visibilityCreateModal = true;
  }

  protected changeVisibilityOfCreateModal(value: boolean) {
    this.visibilityCreateModal = value;
  }

  private loadData(): void {
    this.sessionService.findAll().subscribe((sessions) => {
      this.sessions = sessions;
    });
  }
}
