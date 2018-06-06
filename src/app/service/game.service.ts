import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
//import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
//import { constants } from 'http2';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(private db: AngularFireDatabase) {}
  updateScore(matchRes) {
    const matchResult: firebase.database.Reference = firebase
      .database()
      .ref(`/matchResult/${matchRes.matchId}/`);

    const prediction: firebase.database.Reference = firebase
      .database()
      .ref(`/predictedMatches/${matchRes.matchId}`);
    const matchWinners: firebase.database.Reference = firebase
      .database()
      .ref(`/matchWinners/`);
    const matchPrizeWinners: firebase.database.Reference = firebase
      .database()
      .ref(`/matchPrizeWinners/`);

    matchResult
      .child(matchRes.matchId)
      .update(matchRes)
      .then(() => {
        var predictionval = prediction.on('value', personSnapshot => {
          console.log('value updated in promis', personSnapshot.val());
          var userprediction = personSnapshot.val();
          let result = [];
          for (var key in userprediction) {
            if (userprediction.hasOwnProperty(key)) {
              var val = userprediction[key];
              if (
                val.team1Goal == matchRes.team1Goal &&
                val.team2Goal == matchRes.team2Goal
              ) {
                result.push(val);
                console.log('result', result);
              }
            }
          }
          console.log('result', result);
          matchWinners
            .child(matchRes.matchId)
            .update(result)
            .then(update => {
              console.log('match');
              if (result.length > 2) {
                var a = Math.floor(Math.random() * result.length) + 1;
                var b = Math.floor(Math.random() * result.length) + 1;
                console.log('a', a, 'b', b);

                var random = [];
                for (var i = 0; i < result.length; i++) {
                  var temp = Math.floor(Math.random() * result.length);
                  if (random.indexOf(temp) == -1) {
                    random.push(temp);
                  } else i--;
                }

                var prizewinners = [result[random[0]], result[random[1]]];
                console.log('prize', prizewinners);
                matchPrizeWinners.child(matchRes.matchId).update(prizewinners);
              } else {
                matchPrizeWinners.child(matchRes.matchId).update(result);
              }
            });
        });
      });
  }
}
