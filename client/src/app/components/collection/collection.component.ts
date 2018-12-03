import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollectionService } from '../../services/collection/collection.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

  items:Array<String>= ['','','','','','','','','','','',''];

  constructor(private collectionService: CollectionService, private router: Router) { }

  ngOnInit() {
  }

  getCardList() {
    this.collectionService.getCardData()
    .subscribe((cards: String) => {
      console.log("Cards passed to Collection Service!!!");
      console.log(cards);
    });
  };
}
