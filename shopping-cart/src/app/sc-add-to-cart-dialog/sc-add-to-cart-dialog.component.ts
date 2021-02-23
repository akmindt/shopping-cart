import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  name: string;
  quantity: number;
}

@Component({
  selector: 'app-sc-add-to-cart-dialog',
  templateUrl: './sc-add-to-cart-dialog.component.html',
  styleUrls: ['./sc-add-to-cart-dialog.component.scss']
})
export class ScAddToCartDialogComponent implements OnInit {
  quantityFC = new FormControl('');
  
  constructor(
    public dialogRef: MatDialogRef<ScAddToCartDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    const quantityForm = new FormGroup({
      quantityFC: this.quantityFC
    });

    quantityForm.controls['quantityFC'].setValue(this.data.quantity);
  }

  onCancel(){
    this.dialogRef.close()
  }

  onConfirm(){
    this.dialogRef.close(this.quantityFC.value);
  }

}
