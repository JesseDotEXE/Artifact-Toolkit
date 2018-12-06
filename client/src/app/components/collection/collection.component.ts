import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollectionService } from '../../services/collection/collection.service';
import { Card } from '../../models/card.model';

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

  constructor(private collectionService: CollectionService, private router: Router) { 
  }

  ngOnInit() {
    //this.getCardList();
    this.getCollection();
  }

  getCollection() {
    this.collectionService.getCollection()
    .subscribe((cardData: Card[]) => {
      console.log(cardData);
      this.allCards = cardData; // cardData.slice(0, 48); //Slicing until I can get pagination working.
      this.clearFilter();
    });
  }

  updateCardOwnership(id, curOwn) {
    let newOwn: String = 'false';

    if (curOwn === 'true') {
      newOwn = 'false';
    } else {
      newOwn = 'true';
    }

    this.collectionService.updateCardOwnership(id, newOwn)
      .subscribe((cardData: Card) => {
        //console.log(cardData);

        // This is to avoid having to refresh the whole page.
        let updatedCard: Card;
        this.allCards.forEach((card) => {
          if (card._id === id) {
            updatedCard = card;
          }
        });

        const updateIndexAll = this.allCards.indexOf(updatedCard);
        console.log('Updated Index found: ' + updateIndexAll);
        this.allCards[updateIndexAll] = cardData;

        const updateIndexFilter = this.filteredCards.indexOf(updatedCard);
        console.log('Updated Index found: ' + updateIndexFilter);
        this.filteredCards[updateIndexFilter] = cardData;
        console.log(this.filteredCards);
      });
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
    // console.log('Filter by Collection');
    let tempCards: Card[] = [];

    this.allCards.forEach((card) => {
        if (card.owned === 'true') {
          tempCards.push(card);
        }
    });

    this.filteredCards = tempCards;
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
