import React, { FC } from 'react';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import Expense from '../../utils/types/expense';
import { GlobalStyles } from '../../constants/styles';

interface ExpenseItemProps {
    expense: Expense;
}

const ExpenseItem: FC<ExpenseItemProps> = ({ expense }) => {

    const { amount, date, description } = expense;

    return (
        <Pressable>
            <View style={styles.expenseItem}>
                <View>
                    <Text>{description}</Text>
                    <Text>{date.toString()}</Text>
                </View>
                <View>
                    <Text>{amount}</Text>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    expenseItem: {
        padding: 12,
        marginVertical: 8,
        backgroundColor: GlobalStyles.colors.primary500,
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 6,
        elevation: 3,
        shadowColor: GlobalStyles.colors.primary500,
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4
    },
    textBase: {
        color: GlobalStyles.colors.primary50
    },
    description: {
        color: GlobalStyles.colors.primary50
    },
    amountContainer: {

    },
})

export default ExpenseItem;