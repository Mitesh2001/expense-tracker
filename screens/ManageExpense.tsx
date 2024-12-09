import React, { FC, useContext, useLayoutEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Expense from '../utils/types/expense';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import Button from '../components/UI/Button';
import { ExpensesContext } from '../store/expenses-context';

interface ManageExpenseProps {
    route: any,
    navigation: any
}

const ManageExpense: FC<ManageExpenseProps> = ({ route, navigation }) => {

    const expenseId = route.params?.expenseId as Expense['id'];
    const isEditting = !!expenseId;

    const { deleteExpense, addExpense, updateExpense } = useContext(ExpensesContext);

    const deleteExpenseHandler = () => {
        deleteExpense(expenseId);
        navigation.goBack();
    }

    const cancelHandler = () => {
        navigation.goBack();
    }

    const confirmHandler = () => {
        if (isEditting) {
            updateExpense(expenseId, {
                amount: 100,
                date: new Date(),
                description: "This is the updated description line."
            });
        } else {
            addExpense({
                date: new Date(),
                amount: 35.00,
                description: "This is the descripion line"
            });
        }
        navigation.goBack();
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditting ? "Edit Expense" : "Add Expense"
        })
    }, [navigation, isEditting])

    return (
        <View style={styles.container}>
            <View style={styles.buttons}>
                <Button style={styles.button} mode="flat" onPress={cancelHandler}>
                    Cancel
                </Button>
                <Button style={styles.button} onPress={confirmHandler}>
                    {isEditting ? 'Update' : 'Add'}
                </Button>
            </View>
            {isEditting && (
                <View style={styles.deleteContainer}>
                    <IconButton
                        name="trash"
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
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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
