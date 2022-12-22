import { createStackNavigator } from '@react-navigation/stack';
import MorpionScreen from './Morpion/MorpionScreen';
import SudokuScreen from './sudoku/SudokuScreen';
import WordleScreen from './wordle/WordleScreen';


const Stack = createStackNavigator()

export function WordleStack()
{
    return (
        <Stack.Navigator>
            <Stack.Screen component={WordleScreen} options={{ headerShown: false }} name="Wordle" />
        </Stack.Navigator>)
}



export function SudokuStack()
{
    return (
        <Stack.Navigator>
            <Stack.Screen component={SudokuScreen} options={{ headerShown: false, headerTitle: "bordel" }} name="Sudoku"
            />
        </Stack.Navigator>)
}

export function MorpionStack()
{
    return (
        <Stack.Navigator>
            <Stack.Screen component={MorpionScreen} options={{ headerShown: false, headerTitle: "bordel" }} name="Ti Point Ti Croix"
            />
        </Stack.Navigator>)
}
