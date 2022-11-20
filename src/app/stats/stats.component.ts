import { Component, Input, OnInit } from '@angular/core';
import { Budget } from '../common/interfaces/budget';
import { Expense } from '../common/interfaces/expense';
import { Stat } from '../common/interfaces/stat';
import { BudgetsService } from '../common/services/budgets.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  stats: Stat[];
  total: Stat;

  @Input() mode: string = '';

  constructor(private budgetsService: BudgetsService) {}

  ngOnInit(): void {
    this.getStats();
  }

  getStats(): void {
    const budgets = this.budgetsService.getAll();

    this.stats = budgets.map((budget: Budget) => {
      const expensesValue = budget.expenses.reduce(
        (previousValue: number, currentValue: Expense) =>
          previousValue + currentValue.price * currentValue.amount,
        0
      );
      const ratio =
        budget.value === 0 ? 0 : (expensesValue / budget.value) * 100;

      return {
        budgetName: budget.name,
        budgetValue: budget.value,
        budgetColor: budget.color,
        expensesValue: expensesValue,
        ratio: ratio,
      };
    });

    const totalBudgetsValue = budgets.reduce(
      (previousValue: number, budget: Budget) => {
        return previousValue + budget.value;
      },
      0
    );

    const totalExpensesValue = budgets.reduce(
      (previousValue: number, budget: Budget) => {
        return (
          previousValue +
          budget.expenses.reduce(
            (previousValue: number, expense: Expense) =>
              previousValue + expense.price * expense.amount,
            0
          )
        );
      },
      0
    );

    const totalRadio =
      totalBudgetsValue === 0
        ? 0
        : (totalExpensesValue / totalBudgetsValue) * 100;

    this.total = {
      budgetName: 'Total',
      budgetValue: totalBudgetsValue,
      expensesValue: totalExpensesValue,
      ratio: totalRadio,
    };
  }
}
