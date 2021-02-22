import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sc-toolbar',
  templateUrl: './sc-toolbar.component.html',
  styleUrls: ['./sc-toolbar.component.scss']
})
export class ScToolbarComponent implements OnInit {
  @Output() toggleCart = new EventEmitter(); 

  constructor() { }

  ngOnInit(): void {

  }

  toggle(){
    this.toggleCart.emit(null);
  } 
}
