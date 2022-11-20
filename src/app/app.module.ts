import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StatsComponent } from './stats/stats.component';
import { BudgetsComponent } from './budgets/budgets.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { FormsModule } from '@angular/forms';
import { ExpensesListComponent } from './expenses/expenses-list/expenses-list.component';
import { BudgetsListComponent } from './budgets/budgets-list/budgets-list.component';
import { BudgetDetailsComponent } from './budgets/budget-details/budget-details.component';
import { ExpenseDetailsComponent } from './expenses/expense-details/expense-details.component';
import { LoginComponent } from './auth/login/login.component';
import { NotificationsComponent } from './notifications/notifications/notifications.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StatsComponent,
    BudgetsComponent,
    ExpensesComponent,
    ExpensesListComponent,
    BudgetsListComponent,
    BudgetDetailsComponent,
    ExpenseDetailsComponent,
    LoginComponent,
    NotificationsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
