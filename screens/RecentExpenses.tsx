import React, { useContext } from 'react';
import ExpensesOutput from '../components/Expense/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusdays } from '../utils/date';
import Expense from '../utils/types/expense';

const RecentExpenses = () => {

    const { expenses } = useContext(ExpensesContext);

    const recentExpenses: Expense[] = expenses.filter(expense => {
        const todayDate = new Date();
        const date7DaysAgo = getDateMinusdays(todayDate, 7);

        return (expense.date > date7DaysAgo) && (expense.date < todayDate);
    })

    return (
        <ExpensesOutput
            expenses={recentExpenses}
            expensesPeriod='Last 7 Days'
            fallbackText="No expenses registered for the last 7 days."
        />
    );
}

export default RecentExpenses;
