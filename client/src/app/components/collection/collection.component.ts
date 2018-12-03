import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollectionService } from '../../services/collection/collection.service';
import { CardCollection } from '../../services/collection/collection.model';
import { Card } from '../../services/collection/card.model';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  collection: string[];
  cards: Card[];

  constructor(private collectionService: CollectionService, private router: Router) { }

  ngOnInit() {
    this.getCollection();
  }

  getCardList() {
    this.collectionService.getCardData()
    .subscribe((fullCards: Card[]) => {
      this.cards = fullCards.slice(0, 10); //Slicing for testing pagination.
      //console.log('Card List: ');
      //console.log(this.cards);      
    });
  };

  getCollection() {
    this.collectionService.getCollection()
    .subscribe((data: string[]) => {
      this.collection = data;
      //console.log("Collection: ");
      //console.log(this.collection);
    });
  }

  addCardToCollection(id) {
    //We only want top add if you find it in the collection.
    var cardId: string = id.toString();
    console.log("ID: " + id);
    const cardIndex = this.collection.indexOf(cardId);
    console.log("Card Index: " +  cardIndex);
    if(cardIndex === -1) {
      this.collectionService.addCardToCollection(cardId)
      .subscribe(() => {
        console.log("Added to collection: " + cardId);
        this.getCollection();
      });
    }
  }

  removeCardFromCollection(id) {
    //We only want to remove if you find it in the collection.
    var cardId: string = id.toString();    
    console.log("ID: " + id);
    const cardIndex = this.collection.indexOf(cardId);
    console.log("Card Index: " +  cardIndex);
    if(cardIndex !== -1) {
      this.collectionService.removeCardFromCollection(cardId)
      .subscribe(() => {
        console.log("Removed from collection: " + cardId);
        this.getCollection();
      });
    }
  }
}
