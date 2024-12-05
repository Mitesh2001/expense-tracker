import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Expense from '../../utils/types/expense';
import ExpenseSummary from './ExpenseSummary';
import ExpenseList from './ExpenseList';
import { DUMMY_EXPENSES } from '../../dummy-data';
import { GlobalStyles } from '../../constants/styles';

interface ExpensesOutputProps {
    expenses?: Expense[];
    expensesPeriod: string;
}

const ExpensesOutput: FC<ExpensesOutputProps> = ({ expenses, expensesPeriod }) => {

    return (
        <View style={styles.container}>
            <ExpenseSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
            <ExpenseList expenses={DUMMY_EXPENSES} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700
    }
});

export default ExpensesOutput;