import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sc-empty-cart-dialog',
  templateUrl: './sc-empty-cart-dialog.component.html',
  styleUrls: ['./sc-empty-cart-dialog.component.scss']
})
export class ScEmptyCartDialogComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<ScEmptyCartDialogComponent> ) {}

  ngOnInit(): void {

  }

  close(){
    this.dialogRef.close();
  }

}
