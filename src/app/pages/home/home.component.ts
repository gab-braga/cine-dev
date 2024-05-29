import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ButtonModule } from 'primeng/button';
import { SessionDayComponent } from '../../components/session-day/session-day.component';
import { SessionCardComponent } from '../../components/session-card/session-card.component';
import { CarouselModule } from 'primeng/carousel';
import { Session } from '../../interfaces/session';
import { SessionService } from '../../services/session.service';

const NUMBER_OF_SESSIONS_SHORTCUTS = 14;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    HeaderComponent,
    FooterComponent,
    ButtonModule,
    SessionDayComponent,
    SessionCardComponent,
    CarouselModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  protected loadingSessions: boolean = true;
  protected loadingWeek: boolean = true;
  protected sessionsDay: Date[] = [];
  protected sessionsWeek: Session[] = [];
  protected sessions: Session[] = [];

  constructor(private sessionService: SessionService) {}

  public ngOnInit(): void {
    this.initilizeSessionDays();
    this.loadData();
  }

  private initilizeSessionDays(): void {
    for (let i = 0; i < NUMBER_OF_SESSIONS_SHORTCUTS; i++) {
      this.sessionsDay[i] = new Date(Date.now() + i * 86400000);
    }
  }

  private loadData(): void {
    this.sessionService.findRecent().subscribe((sessions) => {
      this.sessions = sessions;
      this.loadingSessions = false;
    });
    this.sessionService.findThisWeek().subscribe((sessions) => {
      this.sessionsWeek = sessions;
      this.loadingWeek = false;
    });
  }

  protected carousel = [
    {
      uuid: 'baf0426f-1d57-11ef-a163-6045bd3a418c',
      title: 'Homem de Ferro',
      resume:
        'Tony Stark é um industrial bilionário e inventor brilhante que realiza testes bélicos no exterior, mas é sequestrado por terroristas que o forçam a construir uma arma devastadora. Em vez disso, ele constrói uma armadura blindada e enfrenta seus sequestradores. Quando volta aos Estados Unidos, Stark aprimora a armadura e a utiliza para combater o crime.',
      image: 'assets/images/carousel/cover1.png',
    },
    {
      uuid: 'baf99666-1d57-11ef-a163-6045bd3a418c',
      title: 'Vingadores: Ultimato',
      resume:
        'Após Thanos eliminar metade das criaturas vivas, os Vingadores têm de lidar com a perda de amigos e entes queridos. Com Tony Stark vagando perdido no espaço sem água e comida, Steve Rogers e Natasha Romanov lideram a resistência contra o titã louco.',
      image: 'assets/images/carousel/cover2.png',
    },
    {
      uuid: 'aee459eb-1d5a-11ef-a163-6045bd3a418c',
      title: 'Capitão América: O Primeiro Vingador',
      resume:
        'Steve Rogers é um jovem que participa de experiências visando a criação do supersoldado americano. Quando os oficiais militares conseguem transformá-lo em uma arma humana, eles percebem que não podem arriscar a vida do jovem nas batalhas de guerra.',
      image: 'assets/images/carousel/cover3.png',
    },
  ];
}
