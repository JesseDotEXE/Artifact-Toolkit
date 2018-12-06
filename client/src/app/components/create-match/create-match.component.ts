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
  selector: 'app-create-match',
  templateUrl: './create-match.component.html',
  styleUrls: ['./create-match.component.css']
})

export class CreateMatchComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreateMatchComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
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
