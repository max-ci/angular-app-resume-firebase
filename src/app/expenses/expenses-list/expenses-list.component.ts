import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Budget } from 'src/app/common/interfaces/budget';
import { Expense } from 'src/app/common/interfaces/expense';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss'],
})
export class ExpensesListComponent {
  @Input() budgets: Budget[] = [];
  @Input() currentExpense: Expense;
  @Input() mode: string = '';

  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();
}
