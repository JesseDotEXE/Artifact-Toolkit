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
  allCards: Card[];
  filteredCards: Card[];
  filter: string;

  FILTER_NONE: string = "none";
  FILTER_RED: string = "red";
  FILTER_BLUE: string = "blue";
  FILTER_GREEN: string = "green";
  FILTER_BLACK: string = "black";
  FILTER_HERO: string = "Hero";
  FILTER_CREEP: string = "Creep";
  FILTER_SPELL: string = "Spell";
  FILTER_IMPROVEMENT: string = "Improvement";  

  constructor(private collectionService: CollectionService, private router: Router) { }

  ngOnInit() {
    this.getCardList();
    this.getCollection();
  }

  getCardList() {
    this.collectionService.getCardData()
    .subscribe((cardData: Card[]) => {
      this.allCards = cardData; // cardData.slice(0, 48); //Slicing until I can get pagination working.
      this.clearFilter();
    });
  };

  getCollection() {
    this.collectionService.getCollection()
    .subscribe((collectionData: string[]) => {
      this.collection = collectionData;
      // console.log("Collection: ");
      // console.log(this.collection);
    });
  }

  addCardToCollection(id) {
    // We only want top add if you find it in the collection.
    const cardId: string = id.toString();
    console.log('ID: ' + id);
    const cardIndex = this.collection.indexOf(cardId);
    console.log('Card Index: ' +  cardIndex);
    if(cardIndex === -1) {
      this.collectionService.addCardToCollection(cardId)
      .subscribe(() => {
        console.log('Added to collection: ' + cardId);
        this.getCollection();
      });
    }
  }

  removeCardFromCollection(id) {
    // We only want to remove if you find it in the collection.
    var cardId: string = id.toString();    
    console.log("ID: " + id);
    const cardIndex = this.collection.indexOf(cardId);
    console.log("Card Index: " +  cardIndex);
    if(cardIndex !== -1) {
      this.collectionService.removeCardFromCollection(cardId)
      .subscribe(() => {
        console.log('Removed from collection: ' + cardId);
        this.getCollection();
      });
    }
  }

  // Begin Filter Methods
  filterCardsByType(filter: string) {
    // console.log("Filter by: " + filter);
    let tempCards: Card[];
    tempCards = this.allCards; // We don't actually want to mess with the all cards item.

    this.filteredCards = tempCards.filter((card: Card) => {
      return (card.card_type === filter);
    });
    console.log('Temp after filter: ');
    console.log(this.filteredCards);
  }

  filterCardsByColor(filter: string) {
    let tempCards: Card[];
    tempCards = this.allCards; // We don't actually want to mess with the all cards item.

    this.filteredCards = tempCards.filter((card: Card) => {
      return (card.card_color === filter);
    });
    console.log("Temp after filter: ");
    console.log(this.filteredCards);
  }

  clearFilter() {
    this.filteredCards = this.allCards;
    //this.filterCards(this.FILTER_NONE);
  }

  filterByCollection() {
    console.log("Filter by: Collection");
    let tempCards: Card[] = [];

    //We want to add only the cards which have their ID in the collection.
    this.allCards.forEach((card) => {
        var cardId: string = card.card_id.toString();    
        const cardIndex = this.collection.indexOf(cardId);
        console.log("Card Index: " +  cardIndex);
        if(cardIndex !== -1) { //Card Found
          tempCards.push(card);
        }
    });

    this.filteredCards = tempCards;
    //There is a minor issue here is that if I remove from the collection screen it doesn't auto refresh.
    //Work around is fix with a popup.
  }

  filterByRed() {
    this.filterCardsByColor(this.FILTER_RED);
  }

  filterByBlue() {
    this.filterCardsByColor(this.FILTER_BLUE);
  }

  filterByGreen() {
    this.filterCardsByColor(this.FILTER_GREEN);
  }

  filterByBlack() {
    this.filterCardsByColor(this.FILTER_BLACK);
  }

  filterByHero() {
    this.filterCardsByType(this.FILTER_HERO);
  }

  filterByCreep() {
    this.filterCardsByType(this.FILTER_CREEP);
  }

  filterBySpell() {
    this.filterCardsByType(this.FILTER_SPELL);
  }

  filterByImprovement() {
    this.filterCardsByType(this.FILTER_IMPROVEMENT);
  }
  //End Filter Methods

  cardIsInCollection(cardId) {
    const tempId = cardId.toString();
    const cardIndex = this.collection.indexOf(tempId);
    if (cardIndex !== -1) { //Card Found
      return true;
    }
    else {
      return false;
    }
  }
}
