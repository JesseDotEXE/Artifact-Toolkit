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
  selector: 'app-game-record-create-dialog',
  templateUrl: './game-record-create-dialog.component.html',
  styleUrls: ['./game-record-create-dialog.component.css']
})

export class GameRecordCreateDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<GameRecordCreateDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
    console.log(data);
  }
  
  ngOnInit() {
  }

  onCreateClick(): void {
    console.log("CREATE METHOD CALLED");
    this.data.needUpdate = true;
    this.dialogRef.close(this.data);
  }

  onCancelClick(): void {
    console.log("CLOSING METHOD CALLED");
    this.data.needUpdate = false;    
    this.dialogRef.close(this.data);
  }

}
