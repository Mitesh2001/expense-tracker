import { createContext, FC, PropsWithChildren, useReducer } from "react";
import Expense from "../utils/types/expense";

export interface AddExpensePayload {
    description: string;
    amount: number;
    date: Date;
}

interface UpdateExpensePayload {
    id: string;
    data: Partial<AddExpensePayload>;
}

type ExpensesAction =
    | { type: 'ADD'; payload: AddExpensePayload }
    | { type: 'UPDATE'; payload: UpdateExpensePayload }
    | { type: 'DELETE'; payload: string };

const DUMMY_EXPENSES: Expense[] = [
    { id: 'e1', description: 'A pair of shoes', amount: 59.99, date: new Date('2024-09-12') },
    // { id: 'e2', description: 'A pair of trousers', amount: 89.29, date: new Date('2022-01-05') },
    // { id: 'e3', description: 'Some bananas', amount: 5.99, date: new Date('2021-12-01') },
    // { id: 'e4', description: 'A book', amount: 14.99, date: new Date('2022-02-19') },
    // { id: 'e5', description: 'Another book', amount: 18.59, date: new Date('2022-02-18') },
    // { id: 'e6', description: 'A pair of trousers', amount: 89.29, date: new Date('2022-01-05') },
    // { id: 'e7', description: 'Some bananas', amount: 5.99, date: new Date('2021-12-01') },
    // { id: 'e8', description: 'A book', amount: 14.99, date: new Date('2022-02-19') },
    // { id: 'e9', description: 'Another book', amount: 18.59, date: new Date('2022-02-18') },
];

interface ExpensesContextValue {
    expenses: Expense[];
    addExpense: (expenseData: AddExpensePayload) => void;
    deleteExpense: (id: string) => void;
    updateExpense: (id: string, expenseData: Partial<AddExpensePayload>) => void;
}

export const ExpensesContext = createContext<ExpensesContextValue>({
    expenses: [],
    addExpense: () => { },
    deleteExpense: () => { },
    updateExpense: () => { },
});

const expensesReducer = (state: Expense[], action: ExpensesAction): Expense[] => {
    switch (action.type) {
        case 'ADD':
            const id = new Date().toISOString() + Math.random().toString();
            return [{ ...action.payload, id }, ...state];
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
            if (updatableExpenseIndex === -1) return state;
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = { ...updatableExpense, ...action.payload.data };
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload);
        default:
            return state;
    }
}

const ExpensesContextProvider: FC<PropsWithChildren> = ({ children }) => {

    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

    const addExpense = (expenseData: AddExpensePayload) => {
        dispatch({ type: 'ADD', payload: expenseData });
    }

    const deleteExpense = (id: string) => {
        dispatch({ type: 'DELETE', payload: id });
    }

    const updateExpense = (id: string, expenseData: Partial<AddExpensePayload>) => {
        dispatch({ type: 'UPDATE', payload: { id, data: expenseData } });
    }

    const value: ExpensesContextValue = {
        expenses: expensesState,
        addExpense,
        deleteExpense,
        updateExpense,
    };

    return (
        <ExpensesContext.Provider
            value={value}
        >
            {children}
        </ExpensesContext.Provider>
    )

}

export default ExpensesContextProvider;