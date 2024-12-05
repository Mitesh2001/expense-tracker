import React from 'react';
import { StyleSheet, Text } from 'react-native';
import ExpensesOutput from '../components/Expense/ExpensesOutput';

const AllExpenses = () => {
    return (
        <ExpensesOutput expensesPeriod='Total' />
    );
}

const styles = StyleSheet.create({})

export default AllExpenses;
