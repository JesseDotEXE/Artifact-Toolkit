import { Component, OnInit } from '@angular/core';
import { GameRecord } from '../../services/game-record/game-record.model';
import { GameRecordService } from '../../services/game-record/game-record.service';
import { Router } from '../../../../node_modules/@angular/router';
import { MatDialog } from '../../../../node_modules/@angular/material';
import { GameRecordEditDialogComponent } from '../game-record-edit-dialog/game-record-edit-dialog.component';
import { GameRecordCreateDialogComponent } from '../game-record-create-dialog/game-record-create-dialog.component';

@Component({
  selector: 'app-game-record',
  templateUrl: './game-record.component.html',
  styleUrls: ['./game-record.component.css']
})

export class GameRecordComponent implements OnInit {
  gameRecords: GameRecord[];
  displayedColumns = ['date', 'matchType', 'deck', 'oppDeck', 'outcome', 'notes', 'actions'];

  //Edit Variables
  needUpdate: boolean;
  editId: String;
  
  constructor(private gameRecordService: GameRecordService, private router: Router, public dialog: MatDialog) { 
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

  createRecord(newDate, newMatchType, newDeck, newOppDeck, newOutcome, newNotes) {
    this.gameRecordService.createGameRecord(newDate, newMatchType, newDeck, newOppDeck, newOutcome, newNotes).subscribe(() => {
      this.getGameRecords();
    });
  }

  deleteRecord(id) {
    console.log("GOING TO DELETE: " + id);
    this.gameRecordService.deleteGameRecord(id).subscribe(() => {
     this.getGameRecords();
    });
  }

  updateRecord(id, newDate, newMatchType, newDeck, newOppDeck, newOutcome, newNotes) {
    this.gameRecordService.updateGameRecord(id, newDate, newMatchType, newDeck, newOppDeck, newOutcome, newNotes).subscribe(() => {
      this.resetEditData();      
      this.getGameRecords();
    });
  }

  //Create Methods
  openCreateDialog(): void {
    const dialogRef = this.dialog.open(GameRecordCreateDialogComponent, {
      width: '500px',
      data: {
        needUpdate: false,
        newDate: "",
        newMatchType: "",
        newDeck: "",
        newOppDeck: "",
        newOutcome: "",
        newNotes: ""
      }
    } );

    dialogRef.afterClosed().subscribe(result => {
      console.log('CREATE Dialog Closed');
      console.log(result);
      if(result.needUpdate) {
        this.createRecord(result.newDate, result.newMatchType, result.newDeck, result.newOppDeck, result.newOutcome, result.newNotes);
      }
      //this.updateRecord(this.editId, result.newDate, result.newMatchType, result.newDeck, result.newOppDeck, result.newOutcome, result.newNotes);
    });
  }

  //Edit Methods
  openEditDialog(oldData): void {
    console.log("OpenDialog Data: ");
    console.log(oldData);    
    this.editId = oldData._id;
    console.log("EDIT ID: " + this.editId);

    const dialogRef = this.dialog.open(GameRecordEditDialogComponent, {
      width: '500px',
      data: { needUpdate: false,
              oldDate: oldData.date, 
              oldMatchType: oldData.matchType, 
              oldDeck: oldData.deck, 
              oldOppDeck: oldData.oppDeck, 
              oldOutcome: oldData.outcome, 
              oldNotes: oldData.notes,
              newDate: oldData.date,
              newMatchType: oldData.matchType,
              newDeck: oldData.deck,
              newOppDeck: oldData.oppDeck,
              newOutcome: oldData.outcome,
              newNotes: oldData.notes }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog Closed');
      console.log(result);
      if(result.needUpdate) {
        this.updateRecord(this.editId, result.newDate, result.newMatchType, result.newDeck, result.newOppDeck, result.newOutcome, result.newNotes);
      }
    });
  }

  resetEditData() {
    this.editId = "";
  }
}
