import { Component } from '@angular/core';
import { GameService } from './service/game.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private gameService: GameService) {}
  matchRes = {
    matchId: 4,
    team1Goal: 3,
    team2Goal: 3,
    date: '15-06-2018'
  };
  updateScore() {
    this.gameService.updateScore(this.matchRes);
  }
  
}
