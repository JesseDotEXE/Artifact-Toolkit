import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit {
  name: String;
  image: String;
  inCollection: boolean;

  constructor() { }

  ngOnInit() {
    this.name = "TempName";
    this.image = "TempImageURL";
    this.inCollection = false;
  }
}
