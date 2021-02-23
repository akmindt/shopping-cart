import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-sc-delete-dialog',
  templateUrl: './sc-delete-dialog.component.html',
  styleUrls: ['./sc-delete-dialog.component.scss']
})
export class ScDeleteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ScDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public id: number
  ) { }

  onCancel(): void{
    this.dialogRef.close();
  }

}
