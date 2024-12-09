import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Expense from '../../utils/types/expense';
import ExpenseSummary from './ExpenseSummary';
import ExpenseList from './ExpenseList';
import { GlobalStyles } from '../../constants/styles';

interface ExpensesOutputProps {
    expenses: Expense[];
    expensesPeriod: string;
    fallbackText: string;
}

const ExpensesOutput: FC<ExpensesOutputProps> = ({ expenses, expensesPeriod, fallbackText }) => {
    let content = <Text style={styles.infoText}>{fallbackText}</Text>;

    if (expenses.length > 0) {
        content = <ExpenseList expenses={expenses} />;
    }

    return (
        <View style={styles.container}>
            <ExpenseSummary expenses={expenses} periodName={expensesPeriod} />
            {content}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary700,
    },
    infoText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32,
    },
});

export default ExpensesOutput;