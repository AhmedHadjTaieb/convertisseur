import {Component, EventEmitter, Input,Output, OnChanges} from '@angular/core';

@Component({
  selector: 'app-rate-input',
  templateUrl: './rate-input.component.html',
  styleUrls: ['./rate-input.component.scss']
})
export class RateInputComponent implements OnChanges{
  @Input() rate: number=1
  @Output() onFixedRateChanged = new EventEmitter<boolean>
  @Output() onFixedRateChangedValue = new EventEmitter<number>

  isFixedRate: boolean = false
  initialRate:number = this.rate
  ngOnChanges(){
    console.log("ngOnChanges")
    this.initialRate = this.rate
  }
  checkRateChanged(event: Event){
    if (Math.abs(this.initialRate - (+event)) <= 0.02) {
      this.rate = this.initialRate
      this.isFixedRate = false
    }
    this.onFixedRateChangedValue.emit(+event)
  }

  fixedRateHandler(){
    this.isFixedRate=!this.isFixedRate
    this.onFixedRateChanged.emit(this.isFixedRate)
  }
}
