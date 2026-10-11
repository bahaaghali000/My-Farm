import { createAction } from '@ngrx/store';
import { Currency } from '../../models/currency.enum';

export const changeCurrency = createAction('currency/change', (currency: Currency) => ({
  currency,
}));
