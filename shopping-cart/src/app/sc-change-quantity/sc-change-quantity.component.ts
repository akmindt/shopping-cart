import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormControlDirective, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { CartItem } from '../Entities/CartItem';

@Component({
  selector: 'sc-change-quantity',
  templateUrl: './sc-change-quantity.component.html',
  styleUrls: ['./sc-change-quantity.component.scss']
})
export class ScChangeQuantityComponent implements OnInit {
  @Input() item: CartItem = {
    cartItemId: 0,
    productId: 0,
    quantity: 0,
    shoppingCartId: 0
  };
  @Output() updateQuantity = new EventEmitter<number[]>();
  quantityFC = new FormControl('');
  constructor() { }

  ngOnInit(): void {
    const quantityForm = new FormGroup({
      quantityFC: this.quantityFC
    });

    quantityForm.controls['quantityFC'].setValue(this.item.quantity);

    quantityForm.controls['quantityFC'].valueChanges.pipe(debounceTime(300)).subscribe(() => {
      this.emitUpdateQuantity([this.item.cartItemId, quantityForm.controls['quantityFC'].value]);
    });
  }

  emitUpdateQuantity(newItem: number[]){
    console.log('emitting new item update');
    console.log(newItem);
    this.updateQuantity.emit(newItem);
  }

}
