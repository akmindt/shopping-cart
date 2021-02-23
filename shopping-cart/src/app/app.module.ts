import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ScChangeQuantityComponent } from './sc-change-quantity/sc-change-quantity.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScToolbarComponent } from './sc-toolbar/sc-toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { ScDeleteDialogComponent } from './sc-delete-dialog/sc-delete-dialog.component';
import { ScAddToCartDialogComponent } from './sc-add-to-cart-dialog/sc-add-to-cart-dialog.component';

@NgModule({
  declarations: [
    ShoppingCartComponent,
    ScToolbarComponent,
    ScChangeQuantityComponent,
    ScDeleteDialogComponent,
    ScAddToCartDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [ShoppingCartComponent]
})
export class AppModule { }
