import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Budget } from 'src/app/common/interfaces/budget';
import { Expense } from 'src/app/common/interfaces/expense';

@Component({
  selector: 'app-expense-details',
  templateUrl: './expense-details.component.html',
  styleUrls: ['./expense-details.component.scss'],
})
export class ExpenseDetailsComponent {
  @Input() currentExpense: Expense;
  @Input() budgets: Budget[] = [];
  @Input() currentBudgetId = '';
  @Input() mode = '';

  @Output() saved = new EventEmitter();
  @Output() reseted = new EventEmitter();
}
