import React, { useContext } from 'react';
import { StyleSheet, Text } from 'react-native';
import ExpensesOutput from '../components/Expense/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';

const AllExpenses = () => {

    const { expenses } = useContext(ExpensesContext);

    return (
        <ExpensesOutput
            expenses={expenses}
            expensesPeriod='Total'
            fallbackText="No registered expenses found!"
        />
    );
}

const styles = StyleSheet.create({})

export default AllExpenses;
