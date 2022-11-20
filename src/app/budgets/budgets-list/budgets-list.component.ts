import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Budget } from 'src/app/common/interfaces/budget';

@Component({
  selector: 'app-budgets-list',
  templateUrl: './budgets-list.component.html',
  styleUrls: ['./budgets-list.component.scss'],
})
export class BudgetsListComponent {
  @Input() budgets: Budget[];
  @Input() currentBudget: Budget;

  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();
}
