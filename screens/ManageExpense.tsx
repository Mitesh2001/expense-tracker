import React, { FC, useContext, useLayoutEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Expense from '../utils/types/expense';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { AddExpensePayload, ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { getFormattedDate } from '../utils/date';

interface ManageExpenseProps {
    route: any,
    navigation: any
}

let defaultValues = {
    amount: 0,
    date: getFormattedDate(new Date()),
    description: ""
}

const ManageExpense: FC<ManageExpenseProps> = ({ route, navigation }) => {

    const expenseId = route.params?.expenseId as Expense['id'];

    const isEditing = !!expenseId;

    const { deleteExpense, addExpense, updateExpense, expenses } = useContext(ExpensesContext);

    const currentExpense = expenses.find(expense => expense.id === expenseId);

    const deleteExpenseHandler = () => {
        deleteExpense(expenseId);
        navigation.goBack();
    }

    const confirmHandler = (expenseData: AddExpensePayload) => {
        if (isEditing) {
            updateExpense(expenseId, expenseData);
        } else {
            addExpense(expenseData);
        }
        navigation.goBack();
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense"
        })
    }, [navigation, isEditing])

    defaultValues = {
        amount: currentExpense?.amount ?? 0,
        date: getFormattedDate(currentExpense?.date ?? new Date()),
        description: currentExpense?.description ?? ""
    }

    return (
        <View style={styles.container}>
            <ExpenseForm isEditing={isEditing} onSubmit={confirmHandler} defaultValues={defaultValues} />
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton
                        icon="trash"
                        color={GlobalStyles.colors.error500}
                        size={36}
                        onPress={deleteExpenseHandler}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center',
    },
});

export default ManageExpense;
