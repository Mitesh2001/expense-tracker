import React, { FC } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Expense from '../../utils/types/expense';
import ExpenseItem from './ExpenseItem';

interface ExpenseListProps {
    expenses: Expense[];
}

const ExpenseList: FC<ExpenseListProps> = ({ expenses }) => {
    return (
        <FlatList
            data={expenses}
            renderItem={({ item, index }) => {
                return (
                    <ExpenseItem key={index} expense={item} />
                )
            }}
        />
    );
}

const styles = StyleSheet.create({})

export default ExpenseList;
