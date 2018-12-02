import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class GameRecordService {
  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) {     
  }

  getGameRecords() {
    return this.http.get(`${this.uri}/tracker`);
  }

  getGameRecordById(id) {
    return this.http.get(`${this.uri}/tracker/${id}`);
  }

  createGameRecord(newDate, newMatchType, newDeck, newOppDeck, newOutcome, newNotes) {
    const newGameRecord = {
      date: newDate,
      deck: newDeck,
      oppDeck: newOppDeck,
      matchType: newMatchType,
      outcome: newOutcome,
      notes: newNotes
    };

    return this.http.post(`${this.uri}/tracker/create`, newGameRecord);
  }

  updateGameRecord(id, newDate, newMatchType, newDeck, newOppDeck, newOutcome, newNotes) {
    const updatedGameRecord = {
      date: newDate,
      deck: newDeck,
      oppDeck: newOppDeck,
      matchType: newMatchType,
      outcome: newOutcome,
      notes: newNotes
    }
    console.log("NEW MATCH TO UPDATE");
    console.log(id);
    console.log(updatedGameRecord);
    return this.http.post(`${this.uri}/tracker/update/${id}`, updatedGameRecord);
  }

  deleteGameRecord(id) {
    return this.http.get(`${this.uri}/tracker/delete/${id}`);
  }
}
