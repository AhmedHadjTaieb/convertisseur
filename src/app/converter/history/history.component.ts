import {Component, Input} from '@angular/core';
import {IHistory} from "../model/history";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
@Input() histories: IHistory[] = [];

}
