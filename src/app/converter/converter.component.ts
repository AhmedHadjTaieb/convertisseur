import { Component, OnInit, OnDestroy } from '@angular/core';
import {ICurrency} from './model/currency';
import { interval, Subscription } from 'rxjs';
import {IHistory} from "./model/history";

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit, OnDestroy {

  currencies:ICurrency[] = [{currency:'USD',symbol:'$',amount:0},{currency:'EUR',symbol:'€',amount:0}]
  isEurToUsd: boolean = true;
  activeCurrency:ICurrency = this.currencies[0]
  convertedCurrency:ICurrency  = this.currencies[1]
  exchangeRate: number = 1.1;
  fixedRate: number = 0;
  history: IHistory[] = [];
  private exchangeRateSubscription: Subscription= new Subscription();

  ngOnInit() {
    this.startExchangeRateUpdates();
  }

  ngOnDestroy() {
    this.stopExchangeRateUpdates();
  }

  /**
   * startExchangeRateUpdates
   * used for change rate each 3 seconds with random values between -0.05 and +0.O5
   */
  startExchangeRateUpdates() {
    this.exchangeRateSubscription = interval(3000).subscribe(() => {
      const randomChange = Math.random() * 0.1 - 0.05;
      this.exchangeRate += randomChange;
      this.convertAmount(this.activeCurrency.amount)
    });
  }

  /**
   * stopExchangeRateUpdates
   * used to stop the subscription
   */
  stopExchangeRateUpdates() {
    if (this.exchangeRateSubscription) {
      this.exchangeRateSubscription.unsubscribe();
    }
  }

  /**
   * convertAmount
   * used to convert the convertedCurrency related with exchangeRate
   * @param {amount} with type of number for the new entry amount
   */
  convertAmount(amount:number):void{
    if (this.isEurToUsd) {
      this.convertedCurrency.amount = amount * this.exchangeRate;
    } else {
      this.convertedCurrency.amount = amount / this.exchangeRate;
    }
    this.updateHistory()
  }

  /**
   * toggleCurrency
   * used to change the currency
   */
  toggleCurrency():void {
    this.isEurToUsd = !this.isEurToUsd;
    if(this.isEurToUsd) {
      this.activeCurrency = this.currencies.find(c => c.currency === 'EUR')|| this.currencies[1]
      this.convertedCurrency = this.currencies.find(c => c.currency === 'USD')|| this.currencies[0]
    }else {
      this.activeCurrency = this.currencies.find(c => c.currency === 'USD')|| this.currencies[0]
      this.convertedCurrency = this.currencies.find(c => c.currency === 'EUR')|| this.currencies[1]
    }
  }

  /**
   * isFixedRateHandler
   * used to stop subscribe when using a forced amount
   * @param {isFixedRate} with type boolean to indicate if is rate fixed
   */
  isFixedRateHandler(isFixedRate: boolean):void {
    if(isFixedRate)
      this.stopExchangeRateUpdates()
    else {
      this.startExchangeRateUpdates()
      this.fixedRate = 0
    }
  }

  /**
   * fixedRateValueChange
   * used to force rate with fixed rate user
   * @param {newRate} with type number to indicate new rate fixed
   */
  fixedRateValueChange(newRate:number){
    this.convertAmount(newRate)
    this.fixedRate = newRate
  }

  /**
   * updateHistory
   * used to push history of all changes converted
   */
  updateHistory() {
    const historyEntry:IHistory = {
      dateTime: new Date(),
      realRate: this.exchangeRate,
      fixedRate: this.fixedRate,
      initialAmount: this.activeCurrency.amount,
      convertedAmount: this.convertedCurrency.amount,
      currency: this.isEurToUsd ? 'EUR' : 'USD'
    };
    this.history.unshift(historyEntry);
    if (this.history.length > 5) {
      this.history.pop();
    }
  }
}
