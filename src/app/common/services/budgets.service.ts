import { Injectable } from '@angular/core';
import { Budget } from '../interfaces/budget';
import { v4 as uuidv4 } from 'uuid';
import { Expense } from '../interfaces/expense';
import { budgetsData } from '../data/budgets.data';

@Injectable({
  providedIn: 'root',
})
export class BudgetsService {
  budgets: Budget[] = localStorage.getItem('budgets')
    ? JSON.parse(localStorage.getItem('budgets'))
    : [...budgetsData];

  getAll(): Budget[] {
    return this.budgets;
  }

  create(budget: Budget): void {
    this.budgets = [
      ...this.budgets,
      { ...budget, id: uuidv4(), value: parseFloat(budget.value.toString()) },
    ];

    this.saveToLocalStorage();
  }

  update(updatedBudget: Budget): void {
    this.budgets = this.budgets.map((budget) => {
      if (budget.id === updatedBudget.id) {
        return { ...updatedBudget };
      }
      return budget;
    });

    this.saveToLocalStorage();
  }

  delete(id: string): void {
    this.budgets = this.budgets.filter((budget) => budget.id !== id);

    this.saveToLocalStorage();
  }

  createExpense(expense: Expense, budgetId: string): void {
    this.budgets = this.budgets.map((budget) => {
      if (budget.id === budgetId) {
        return {
          ...budget,
          expenses: [...budget.expenses, { ...expense, id: uuidv4() }],
        };
      }
      return budget;
    });

    this.saveToLocalStorage();
  }

  updateExpense(updatedExpense: Expense, budgetId: string): void {
    this.budgets = this.budgets.map((budget) => {
      const expenseInBudget = budget.expenses.find(
        (expense) => expense.id === updatedExpense.id
      );

      if (expenseInBudget) {
        if (budget.id === budgetId) {
          const expenses = budget.expenses.map((expense) => {
            if (expenseInBudget.id === expense.id) {
              return updatedExpense;
            }
            return expense;
          });
          return { ...budget, expenses };
        } else {
          const expenses = budget.expenses.filter(
            (expense) => expense.id !== updatedExpense.id
          );
          return { ...budget, expenses };
        }
      } else {
        if (budget.id === budgetId) {
          return { ...budget, expenses: [...budget.expenses, updatedExpense] };
        }
      }
      return budget;
    });

    this.saveToLocalStorage();
  }

  deleteExpense(expenseId: string, budgetId: string): void {
    this.budgets = this.budgets.map((budget) => {
      if (budget.id === budgetId) {
        const expenses = budget.expenses.filter(
          (expense) => expense.id !== expenseId
        );

        return { ...budget, expenses };
      }
      return budget;
    });

    this.saveToLocalStorage();
  }

  setSampleData(): void {
    this.budgets = [...budgetsData];

    this.saveToLocalStorage();
  }

  saveToLocalStorage(): void {
    localStorage.setItem('budgets', JSON.stringify(this.budgets));
  }
}
