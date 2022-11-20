import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Budget } from 'src/app/common/interfaces/budget';

@Component({
  selector: 'app-budget-details',
  templateUrl: './budget-details.component.html',
  styleUrls: ['./budget-details.component.scss'],
})
export class BudgetDetailsComponent {
  @Input() budgets: Budget[];
  @Input() currentBudget: Budget;
  @Input() mode: string;

  @Output() saved = new EventEmitter();
  @Output() reseted = new EventEmitter();
}
