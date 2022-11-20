import { Component, OnInit } from '@angular/core';
import { Budget } from '../common/interfaces/budget';
import { BudgetsService } from '../common/services/budgets.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  budgets: Budget[] = [];

  constructor(private budgetsService: BudgetsService) {}

  ngOnInit(): void {
    this.getAllBudgets();
  }

  getAllBudgets(): void {
    this.budgets = this.budgetsService.getAll();
  }
}
