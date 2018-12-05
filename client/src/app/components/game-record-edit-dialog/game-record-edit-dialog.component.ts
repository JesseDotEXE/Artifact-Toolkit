import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material'

export interface DialogData {
  needUpdate: boolean;
  newDate: String;
  newMatchType: String;
  newDeck: String;
  newOppDeck: String;
  newOutcome: String;
  newNotes: String;
}

@Component({
  selector: 'app-game-record-edit-dialog',
  templateUrl: './game-record-edit-dialog.component.html',
  styleUrls: ['./game-record-edit-dialog.component.css']
})

export class GameRecordEditDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<GameRecordEditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
    console.log(data);
  }

  ngOnInit() {
  }

  onUpdateClick(): void {
    console.log("UPDATING METHOD CALLED");
    this.data.needUpdate = true;
    this.dialogRef.close(this.data);
  }

  onCancelClick(): void {
    console.log("CLOSING METHOD CALLED");
    this.data.needUpdate = false;    
    this.dialogRef.close(this.data);
  }
}
