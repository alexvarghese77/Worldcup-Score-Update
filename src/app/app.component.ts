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
    matchId: 301,
    team1Goal: 1,
    team2Goal: 1,
    date: '12-06-2018'
  };
  updateScore() {
    this.gameService.updateScore(this.matchRes);
  }
}
