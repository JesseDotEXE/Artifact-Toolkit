import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CollectionService {
  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) {
  }

  // getCardData() {
  //   return this.http.get(`${this.uri}/cards`);
  // }

  getCollection() {
    return this.http.get(`${this.uri}/collection`);
  }

  updateCardOwnership(id, newOwnership) {
    const updatedCardValues = {
      owned: newOwnership
    };
    return this.http.post(`${this.uri}/collection/update/${id}`, updatedCardValues);
  }
}
