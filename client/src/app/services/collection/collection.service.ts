import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CollectionService {
  uri = 'http://localhost:4000';
  fakeUserId = '5bff3727fb6fc038cbae8a41'; //Using this to fake a user being "logged in".

  constructor(private http: HttpClient) {     
  }

  getCardData() {
    return this.http.get(`${this.uri}/cards`);
  }

  getCollection() {
    return this.http.get(`${this.uri}/collection/${this.fakeUserId}`);
  }

  addCardToCollection(cardId) {
    return this.http.get(`${this.uri}/collection/add/${this.fakeUserId}/${cardId}`);
  }

  removeCardToCollection(cardId) {
    return this.http.get(`${this.uri}/collection/remove/${this.fakeUserId}/${cardId}`);
  }
}
