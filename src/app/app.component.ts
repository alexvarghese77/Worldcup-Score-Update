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
    matchId: 1,
    team1Goal: 4,
    team2Goal: 5
  };
  updateScore() {
    this.gameService.updateScore(this.matchRes);
  }
}