import { Component, OnInit } from '@angular/core';
import { Budget } from '../common/interfaces/budget';
import { BudgetsService } from '../common/services/budgets.service';
import { NotificationService } from '../common/services/notification.service';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.scss'],
})
export class BudgetsComponent implements OnInit {
  budgets: Budget[] = [];
  emptyBudget: Budget = {
    id: '',
    name: '',
    color: '#000',
    value: 0,
    expenses: [],
  };
  currentBudget: Budget = { ...this.emptyBudget };
  mode: string = 'Create';

  constructor(
    private budgetsService: BudgetsService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getAllBudgets();
  }

  getAllBudgets(): void {
    this.budgets = this.budgetsService.getAll();
  }

  setCurrentBudget(budget: Budget): void {
    if (budget.id !== '' && this.currentBudget.id === budget.id) {
      this.reset();
      return;
    }

    this.currentBudget = { ...budget };
    this.setMode('Save');
  }

  loadSampleData(): void {
    this.budgetsService.setSampleData();

    this.reset();

    this.getAllBudgets();

    this.notificationService.show('Sample data loaded.');
  }

  saveBudget(budget: Budget): void {
    if (budget.value < 1) {
      this.notificationService.show(
        `Budget limit should be grather than 0.`,
        'danger'
      );
      return;
    }

    if (budget.id) {
      this.updateBudget(budget);

      this.notificationService.show(`Budget "${budget.name}" updated.`);
    } else {
      this.createBudget(budget);

      this.notificationService.show(`Budget "${budget.name}" added.`);
    }

    this.reset();

    this.getAllBudgets();
  }

  createBudget(budget: Budget): void {
    this.budgetsService.create(budget);
  }

  updateBudget(budget: Budget): void {
    this.budgetsService.update(budget);
  }

  deleteBudget({ id, name }: { id: string; name: string }): void {
    this.budgetsService.delete(id);

    if (this.currentBudget.id === id) {
      this.reset();
    }

    this.getAllBudgets();

    this.notificationService.show(`Budget "${name}" deleted.`);
  }

  reset(): void {
    this.setCurrentBudget(this.emptyBudget);
    this.setMode('Create');
  }

  setMode(mode: string): void {
    this.mode = mode;
  }
}
