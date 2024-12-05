import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Expense from '../../utils/types/expense';
import { GlobalStyles } from '../../constants/styles';

interface ExpenseSummaryProps {
    expenses: Expense[];
    periodName: string;
}

const ExpenseSummary: FC<ExpenseSummaryProps> = ({ expenses, periodName }) => {

    const expensesSum = expenses.reduce((sum, expense) => (sum + expense.amount), 0);

    return (
        <View style={styles.container}>
            <Text style={styles.period}>{periodName}</Text>
            <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius: 6,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    period: {
        fontSize: 16,
        color: GlobalStyles.colors.primary400
    },
    sum: {
        fontSize: 16,
        fontWeight: "bold",
        color: GlobalStyles.colors.primary400
    }
});

export default ExpenseSummary;
