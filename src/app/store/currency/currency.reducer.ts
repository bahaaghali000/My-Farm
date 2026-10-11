import { createReducer, on } from '@ngrx/store';
import { changeCurrency } from './currency.action';

const initialState = {
  currency: localStorage.getItem('currency') || 'egp',
};

export const currencyReducer = createReducer(
  initialState,
  on(changeCurrency, (state, action) => ({
    ...state,
    currency: action.currency,
  })),
);
