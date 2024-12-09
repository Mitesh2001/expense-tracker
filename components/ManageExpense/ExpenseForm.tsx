import React, { FC, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Input from './Input';
import Expense from '../../utils/types/expense';
import { GlobalStyles } from '../../constants/styles';
import Button from '../UI/Button';
import { useNavigation } from '@react-navigation/native';
import { AddExpensePayload } from '../../store/expenses-context';

type InputValues = Pick<Expense, "amount" | "description"> & { date: string };

interface ExpenseFormProps {
    isEditing: boolean,
    onSubmit: (expenseData: AddExpensePayload) => void,
    defaultValues: InputValues
}

const ExpenseForm: FC<ExpenseFormProps> = ({ isEditing, onSubmit, defaultValues }) => {

    const [inputValues, setInputValue] = useState<InputValues>(defaultValues);

    const navigation = useNavigation();

    const inputChangeHandler = (key: keyof InputValues, newValue: any) => {
        setInputValue(pre => ({
            ...pre,
            [key]: newValue
        }))
    }

    const cancelHandler = () => {
        navigation.goBack();
    }

    const submitHandler = () => {
        const expenseData = {
            amount: +inputValues.amount,
            date: new Date(inputValues.date),
            description: inputValues.description
        }

        const isAmountValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const isDateValid = expenseData.date.toString() !== "Invalid Date";
        const isDescriptionValid = expenseData.description.trim().length > 0;

        if (!isAmountValid || !isDateValid || !isDescriptionValid) {
            Alert.alert("Invalid input", "Please check your inout values");
            return;
        }

        onSubmit(expenseData)
    }

    return (
        <>
            <View style={styles.form}>
                <Text style={styles.title}>Your Expense</Text>
                <View style={styles.inputsRow}>
                    <Input
                        style={styles.rowInput}
                        label="Amount"
                        textInputConfig={{
                            keyboardType: 'decimal-pad',
                            onChangeText: inputChangeHandler.bind(this, "amount"),
                            value: inputValues.amount.toString()
                        }}
                    />
                    <Input
                        style={styles.rowInput}
                        label="Date"
                        textInputConfig={{
                            placeholder: 'YYYY-MM-DD',
                            maxLength: 10,
                            onChangeText: inputChangeHandler.bind(this, "date"),
                            value: inputValues.date.toString()
                        }}
                    />
                </View>
                <Input
                    label="Description"
                    textInputConfig={{
                        multiline: true,
                        onChangeText: inputChangeHandler.bind(this, "description"),
                        value: inputValues.description
                    }}
                />
            </View>
            <View style={styles.buttons}>
                <Button style={styles.button} mode="flat" onPress={cancelHandler}>
                    Cancel
                </Button>
                <Button style={styles.button} onPress={submitHandler}>
                    {isEditing ? 'Update' : 'Add'}
                </Button>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    form: {
        marginTop: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center'
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowInput: {
        flex: 1,
    },
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
    }
});

export default ExpenseForm;
