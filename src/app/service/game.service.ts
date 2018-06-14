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
      .ref(`/matchResult/`);

    const prediction: firebase.database.Reference = firebase
      .database()
      .ref(`/predictedMatches/${matchRes.matchId}`);
    const matchWinners: firebase.database.Reference = firebase
      .database()
      .ref(`/matchWinners/`);
    const matchPrizeWinners: firebase.database.Reference = firebase
      .database()
      .ref(`/Matches/${matchRes.date}`);
    const userDetails: firebase.database.Reference = firebase
      .database()
      .ref(`/Matches/${matchRes.date}`);

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
                for (let index = 1; index <= prizewinners.length; index++) {
                  var userName = 'user' + index;
                  var userNameOrEmail = result[index - 1].name
                    ? result[index - 1].name
                    : result[index - 1].user;
                  var user1 = { [userName]: userNameOrEmail };
                  matchPrizeWinners.child(`${matchRes.matchId}`).update(user1);
                }
                matchPrizeWinners
                  .child(`${matchRes.matchId}`)
                  .update({ team1Goal: matchRes.team1Goal });
                matchPrizeWinners
                  .child(`${matchRes.matchId}`)
                  .update({ team2Goal: matchRes.team2Goal });
              } else {
                for (let index = 1; index <= result.length; index++) {
                  var userName = 'user' + index;
                  var userNameOrEmail = result[index - 1].name
                    ? result[index - 1].name
                    : result[index - 1].user;
                  var user1 = { [userName]: userNameOrEmail };
                  matchPrizeWinners.child(`${matchRes.matchId}`).update(user1);
                }

                //for updating the actual match goal
                matchPrizeWinners
                  .child(`${matchRes.matchId}`)
                  .update({ team1Goal: matchRes.team1Goal });
                matchPrizeWinners
                  .child(`${matchRes.matchId}`)
                  .update({ team2Goal: matchRes.team2Goal });
              }
             // this.pointUpdate(result, matchRes);
            });
        });
      });
  }

  pointUpdate(result, matchRes) {
    var userPointUpdateRef: firebase.database.Reference = firebase
      .database()
      .ref(`/user/`);
    for (let i = 0; i < result.length; i++) {
      var userProfileRef: firebase.database.Reference = firebase
        .database()
        .ref(`/user/${result[i].user}`);
      userProfileRef.once('value', personSnapshot => {
        console.log('value updated in promis', personSnapshot.val());
        var userProfile = personSnapshot.val();
        // this.UpdateIndividualPoint(userProfile, result[i].user)
        var point = {
          point: userProfile.point + 10
        };
        userPointUpdateRef
          .child(result[i].user)
          .update(point)
          .then(() => console.log('done'));
      });
    }
  }
}
