import { Component, OnInit } from '@angular/core';
import { GameRecord } from '../../models/game-record.model';
import { MatchTrackerService } from '../../services/match-tracker/match-tracker.service';
import { Router } from '@angular/router'
import { MatDialog } from '@angular/material'
import { EditMatchComponent } from '../edit-match/edit-match.component';
import { CreateMatchComponent } from '../create-match/create-match.component';

@Component({
  selector: 'app-match-tracker',
  templateUrl: './match-tracker.component.html',
  styleUrls: ['./match-tracker.component.css']
})

export class MatchTrackerComponent implements OnInit {
  gameRecords: GameRecord[];
  displayedColumns = ['date', 'matchType', 'deck', 'oppDeck', 'outcome', 'notes', 'actions'];

  //Edit Variables
  needUpdate: boolean;
  editId: String;
  
  constructor(private matchTrackerService: MatchTrackerService, private router: Router, public dialog: MatDialog) { 
  }

  ngOnInit() {
    this.getGameRecords();
  }

  getGameRecords() {
    this.matchTrackerService.getGameRecords()
      .subscribe((records: GameRecord[]) => {
        this.gameRecords = records;
        //console.log('Game Records: ');
        //console.log(this.gameRecords);
      });
  }

  createRecord(newDate, newMatchType, newDeck, newOppDeck, newOutcome, newNotes) {
    this.matchTrackerService.createGameRecord(newDate, newMatchType, newDeck, newOppDeck, newOutcome, newNotes).subscribe(() => {
      this.getGameRecords();
    });
  }

  deleteRecord(id) {
    console.log("GOING TO DELETE: " + id);
    this.matchTrackerService.deleteGameRecord(id).subscribe(() => {
     this.getGameRecords();
    });
  }

  updateRecord(id, newDate, newMatchType, newDeck, newOppDeck, newOutcome, newNotes) {
    this.matchTrackerService.updateGameRecord(id, newDate, newMatchType, newDeck, newOppDeck, newOutcome, newNotes).subscribe(() => {
      this.resetEditData();      
      this.getGameRecords();
    });
  }

  //Create Methods
  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateMatchComponent, {
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
    });
  }

  //Edit Methods
  openEditDialog(oldData): void {
    console.log("OpenDialog Data: ");
    console.log(oldData);    
    this.editId = oldData._id;
    console.log("EDIT ID: " + this.editId);

    const dialogRef = this.dialog.open(EditMatchComponent, {
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
