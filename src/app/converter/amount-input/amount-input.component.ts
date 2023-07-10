import { Component } from '@angular/core';
import { Output, EventEmitter, Input } from '@angular/core';
import {ICurrency} from '../model/currency';
@Component({
  selector: 'app-amount-input',
  templateUrl: './amount-input.component.html',
  styleUrls: ['./amount-input.component.scss']
})

export class AmountInputComponent {
  @Input() amountCurrency: ICurrency = {currency:'',symbol:'',amount:0}
  @Input() isDisabled: boolean = false
  @Output() newAmountEvent:EventEmitter<number> = new EventEmitter<number>()

  amountChanged(event: Event):void {
    const value : string= (<HTMLTextAreaElement>event.target).value
    const returnedValue :number  = /^\d/.test(value.charAt(0)) ?  +value : +value.substring(1)
    this.amountCurrency.amount = returnedValue
    this.newAmountEvent.emit(returnedValue)
  }
}
