import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class MatchdataService {
  private data;
  constructor(private httpService: HttpClient) {
    this.httpService.get('./assets/JSON/match.json').subscribe(result => {
      this.data = result;
    });
  }
  getmatches(dates) {
    return this.data.Matches[dates];
  }
}
