import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe} from '@angular/common';
import { AppComponent } from './app.component';
import { ConverterComponent } from './converter/converter.component';
import { RateInputComponent } from './converter/rate-input/rate-input.component';
import { AmountInputComponent } from './converter/amount-input/amount-input.component';
import { HistoryComponent } from './converter/history/history.component';

@NgModule({
  declarations: [
    AppComponent,
    ConverterComponent,
    RateInputComponent,
    AmountInputComponent,
    HistoryComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
