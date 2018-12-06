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

  addOwned: boolean = false;
  addRed: boolean = false;
  addBlue: boolean = false;
  addGreen: boolean = false;
  addBlack: boolean = false;
  addHero: boolean = false;
  addCreep: boolean = false;
  addSpell: boolean = false;
  addImprovement: boolean = false;
  addItem: boolean = false;

  FILTER_NONE: string = "none";
  FILTER_RED: string = "red";
  FILTER_BLUE: string = "blue";
  FILTER_GREEN: string = "green";
  FILTER_BLACK: string = "black";
  FILTER_HERO: string = "Hero";
  FILTER_CREEP: string = "Creep";
  FILTER_SPELL: string = "Spell";
  FILTER_IMPROVEMENT: string = "Improvement";  
  FILTER_ITEM: string = "Item";

  constructor(private collectionService: CollectionService, private router: Router) { 
  }

  ngOnInit() {
    //this.getCardList();
    this.getCollection();    
  }

  getCollection() {
    this.collectionService.getCollection()
    .subscribe((cardData: Card[]) => {
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
        this.allCards[updateIndexAll] = cardData;

        const updateIndexFilter = this.filteredCards.indexOf(updatedCard);
        this.filteredCards[updateIndexFilter] = cardData;
      });
  }

  applyFilters() {
    //Start with all the cards.
    let finalCards: Card[] = this.allCards;

    //Then lets decide if we will only do owned/all.
    if(this.addOwned) {
      finalCards = this.filterByCollection(finalCards);
    }

    //Next of that set lets add in cards by color using our already filtered above.
    let coloredCards: Card[] = [];
    if(this.addRed) {
      coloredCards = coloredCards.concat(this.filterCardsByColor(finalCards, this.FILTER_RED));
    }
    if(this.addBlue) {
      coloredCards = coloredCards.concat(this.filterCardsByColor(finalCards, this.FILTER_BLUE));
    }
    if(this.addGreen) {
      coloredCards = coloredCards.concat(this.filterCardsByColor(finalCards, this.FILTER_GREEN));
    }
    if(this.addBlack) {
      coloredCards = coloredCards.concat(this.filterCardsByColor(finalCards, this.FILTER_BLACK));
    }
    if(coloredCards.length > 0) {
      finalCards = coloredCards;
    }

    //Finally of that set lets add in cards by type using our already filtered above.
    let typedCards: Card[] = [];
    if(this.addHero) {
      typedCards = typedCards.concat(this.filterCardsByType(finalCards, this.FILTER_HERO));
    }
    if(this.addCreep) {
      typedCards = typedCards.concat(this.filterCardsByType(finalCards, this.FILTER_CREEP));
    }
    if(this.addSpell) {
      typedCards = typedCards.concat(this.filterCardsByType(finalCards, this.FILTER_SPELL));
    }
    if(this.addImprovement) {
      typedCards = typedCards.concat(this.filterCardsByType(finalCards, this.FILTER_IMPROVEMENT));
    }
    if(this.addItem) {
      typedCards = typedCards.concat(this.filterCardsByType(finalCards, this.FILTER_ITEM));
    }
    if(typedCards.length > 0) {
      finalCards = typedCards;
    }

    this.filteredCards = finalCards;
  }

  filterByCollection(tempCards: Card[]) {
    tempCards = tempCards.filter((card: Card) => {
      return (card.owned === 'true');
    });    
    return tempCards;
  }

  filterCardsByColor(tempCards: Card[], filter: string) {
    let retCards: Card[] = tempCards.filter((card: Card) => {
      return (card.card_color === filter);
    });
    return retCards;
  }

  // Begin Filter Methods
  filterCardsByType(tempCards: Card[], filter: string) {
    let retCards: Card[] = tempCards.filter((card: Card) => {
      return (card.card_type === filter);
    });
    return retCards;
  }

  clearFilter() {
    this.filteredCards = this.allCards;
    this.addOwned = false;
    this.addRed = false;
    this.addBlue = false;
    this.addGreen = false;
    this.addBlack = false;
    this.addHero = false;
    this.addCreep = false;
    this.addSpell = false;
    this.addImprovement = false;
    this.addItem = false;
  }

  toggleOwned() {
    this.addOwned = !this.addOwned;
  }

  toggleRed() {
    this.addRed = !this.addRed;
  }

  toggleBlue() {
    this.addBlue = !this.addBlue;
  }

  toggleGreen() {
    this.addGreen = !this.addGreen;
  }

  toggleBlack() {
    this.addBlack = !this.addBlack;
  }

  toggleHero() {
    this.addHero = !this.addHero;
  }

  toggleCreep() {
    this.addCreep = !this.addCreep;
  }

  toggleSpell() {
    this.addSpell = !this.addSpell;
  }

  toggleImprovement() {
    this.addImprovement = !this.addImprovement;
  }

  toggleItem() {
    this.addItem = !this.addItem;
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
