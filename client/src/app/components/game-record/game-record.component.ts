import { Component, OnInit } from '@angular/core';
import { GameRecord } from '../../services/game-record/game-record.model';
import { GameRecordService } from '../../services/game-record/game-record.service';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-game-record',
  templateUrl: './game-record.component.html',
  styleUrls: ['./game-record.component.css']
})

export class GameRecordComponent implements OnInit {
  gameRecords: GameRecord[];
  displayedColumns = ['date', 'matchType', 'deck', 'oppDeck', 'outcome', 'notes', 'actions'];

  constructor(private gameRecordService: GameRecordService, private router: Router) { 
  }

  ngOnInit() {
    this.getGameRecords();
  }

  getGameRecords() {
    this.gameRecordService.getGameRecords()
      .subscribe((records: GameRecord[]) => {
        this.gameRecords = records;
        console.log('Game Records: ');
        console.log(this.gameRecords);
      });
  }

  deleteRecord(id) {
    this.gameRecordService.deleteGameRecord(id).subscribe(() => {
      this.getGameRecords();
    });
  }

}
