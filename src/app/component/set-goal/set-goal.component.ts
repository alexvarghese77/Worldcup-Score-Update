import { Component, OnInit } from '@angular/core';
import { MatchdataService } from '../../service/matchdata.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GameService } from '../../service/game.service';
@Component({
  selector: 'app-set-goal',
  templateUrl: './set-goal.component.html',
  styleUrls: ['./set-goal.component.css']
})
export class SetGoalComponent implements OnInit {
  matchScoreForm: FormGroup;
  constructor(
    private matchdatamervice: MatchdataService,
    private fb: FormBuilder,
    private gameService: GameService
  ) {
    this.createForm();
  }
  createForm() {
    this.matchScoreForm = this.fb.group({
      date: ['', Validators.required],
      matchId: ['', Validators.required],
      team1Goal: ['', Validators.required],
      team2Goal: ['', Validators.required]
    });
  }
  data: any = null;
  ngOnInit() {}
  dateChange(input) {
    var date = this.dateFormater(input);
    this.data = this.matchdatamervice.getmatches(date);
  }

  updateGoal() {
    let val = this.matchScoreForm.value;
    val.date = this.dateFormater(this.matchScoreForm.value.date);
    console.log(val);

    this.gameService.updateScore(val);
  }

  dateFormater(input) {
    var datePart = input.match(/\d+/g),
      year = datePart[0],
      month = datePart[1],
      day = datePart[2];

    var date = day + '-' + month + '-' + year;
    return date;
  }
}
