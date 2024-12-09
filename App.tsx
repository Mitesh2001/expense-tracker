import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import ManageExpense from './screens/ManageExpense';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllExpenses from './screens/AllExpenses';
import RecentExpenses from './screens/RecentExpenses';
import { GlobalStyles } from './constants/styles';
import { Ionicons } from '@expo/vector-icons';
import IconButton from './components/UI/IconButton';
import Expense from './utils/types/expense';
import ExpensesContextProvider from './store/expenses-context';

type RootStackParamList = {
  ManageExpense: { ExpenseId: Expense['id'] };
  expenseOverview: undefined
};

export default function App() {

  const Stack = createNativeStackNavigator<RootStackParamList>();

  const BottomTab = createBottomTabNavigator();

  const ExpenseOverview = () => {
    return (
      <BottomTab.Navigator
        screenOptions={({ navigation }) => ({
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          headerTintColor: "white",
          tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          tabBarActiveTintColor: GlobalStyles.colors.accent500,
          headerRight: ({ tintColor }) => <IconButton color={tintColor} name='add' size={24} onPress={() => { navigation.navigate('ManageExpense') }} />
        })}
      >
        <BottomTab.Screen
          name='recentExpenses'
          component={RecentExpenses}
          options={{
            title: "Recent Expenses",
            tabBarLabel: "Recent",
            tabBarIcon: ({ color, size }) => <Ionicons name='hourglass' size={size} color={color} />
          }}
        />
        <BottomTab.Screen
          name='allExpenses'
          component={AllExpenses}
          options={{
            title: "All Expenses",
            tabBarLabel: "All Expenses",
            tabBarIcon: ({ color, size }) => <Ionicons name='calendar' size={size} color={color} />
          }}
        />
      </BottomTab.Navigator>
    )
  }

  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: GlobalStyles.colors.primary500,
              },
              headerTintColor: "white"
            }}
          >
            <Stack.Screen
              name='expenseOverview'
              component={ExpenseOverview}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name='ManageExpense'
              component={ManageExpense}
              options={{
                presentation: "modal",
                title: "Manage Expense"
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}
