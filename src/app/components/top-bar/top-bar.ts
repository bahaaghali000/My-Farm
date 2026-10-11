import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Currency } from '../../models/currency.enum';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-top-bar',
  imports: [AsyncPipe],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.css',
})
export class TopBar {
  store = inject(Store);
  currency$: Observable<{ currency: Currency }> = this.store.select('currency');

  changeCurrency(currency: Currency) {
    this.store.dispatch({ type: 'currency/change', currency });

    // Save the selected currency to localStorage
    localStorage.setItem('currency', currency);
  }
}
