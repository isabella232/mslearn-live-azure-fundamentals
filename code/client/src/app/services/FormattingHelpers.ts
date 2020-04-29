import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
  })
export class FormattingHelpers {
    CurrencyDisplay(amount: number) {
        return "$" + amount.toFixed(2);
    }
}
