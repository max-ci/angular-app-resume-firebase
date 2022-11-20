import { Component, OnInit } from '@angular/core';
import { Budget } from '../common/interfaces/budget';
import { Expense } from '../common/interfaces/expense';
import { BudgetsService } from '../common/services/budgets.service';
import { NotificationService } from '../common/services/notification.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent implements OnInit {
  budgets: Budget[] = [];
  emptyExpense: Expense = {
    id: '',
    name: '',
    amount: 0,
    price: 0,
  };
  currentExpense: Expense = { ...this.emptyExpense };
  currentBudgetId = '';
  mode: string = 'Create';

  constructor(
    private budgetsService: BudgetsService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getAllExpenses();
  }

  getAllExpenses(): void {
    this.budgets = this.budgetsService.getAll();
  }

  // TODO: try to use "get" method from service
  setCurrentExpense({
    expense,
    budgetId,
  }: {
    expense: Expense;
    budgetId: string;
  }): void {
    if (expense.id !== '' && this.currentExpense.id === expense.id) {
      this.reset();
      return;
    }
    this.currentExpense = { ...expense };
    this.currentBudgetId = budgetId;
    this.setMode('Save');
  }

  loadSampleData(): void {
    this.budgetsService.setSampleData();

    this.reset();

    this.getAllExpenses();

    this.notificationService.show('Sample data loaded.');
  }

  saveExpense({
    expense,
    budgetId,
  }: {
    expense: Expense;
    budgetId: string;
  }): void {
    if (expense.price < 1) {
      this.notificationService.show(
        `Price should be greather than 0.`,
        'danger'
      );
      return;
    }

    if (expense.amount < 1) {
      this.notificationService.show(
        `Amount should be greather than 0.`,
        'danger'
      );
      return;
    }

    if (expense.id) {
      this.updateExpense(expense, budgetId);

      this.notificationService.show(`Expense "${expense.name}" updated.`);
    } else {
      this.createExpense(expense, budgetId);

      this.notificationService.show(`Expense "${expense.name}" added.`);
    }

    this.reset();

    this.getAllExpenses();
  }

  createExpense(expense: Expense, budgetId: string): void {
    this.budgetsService.createExpense(expense, budgetId);
  }

  updateExpense(expense: Expense, budgetId: string): void {
    this.budgetsService.updateExpense(expense, budgetId);
  }

  deleteExpense({
    expenseId,
    expenseName,
    budgetId,
  }: {
    expenseId: string;
    expenseName: string;
    budgetId: string;
  }): void {
    this.budgetsService.deleteExpense(expenseId, budgetId);

    if (this.currentExpense.id === expenseId) {
      this.reset();
    }

    this.getAllExpenses();

    this.notificationService.show(`Expense "${expenseName}" deleted`);
  }

  reset(): void {
    this.setCurrentExpense({ expense: this.emptyExpense, budgetId: '' });
    this.setMode('Create');
  }

  setMode(mode: string): void {
    this.mode = mode;
  }
}
