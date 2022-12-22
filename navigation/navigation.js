import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { MorpionStack, SudokuStack, WordleStack } from "./stacks/stack";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, Appearance } from "react-native";

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()
function Test()
{
    return (<View style={{ flex: 1, justifyContent: "center" }}>
        <Text>Hellooo</Text>
    </View>)
}

export default class Navigation extends React.Component
{
    constructor (props)
    {
        super(props)
        this.state = {
            theme: Appearance.getColorScheme()
        }
        Appearance.addChangeListener((pref) =>
        {
            this.setState({ theme: Appearance.getColorScheme() })
        })
    }
    render()
    {
        let white = (this.state.theme === "light") ? "white" : "rgb(25,25,25)"
        let black = (this.state.theme === "light") ? "black" : "white"

        return (
            <NavigationContainer>
                <Drawer.Navigator screenOptions={{ lazy: false }}>
                    <Drawer.Screen component={WordleStack} name="WordleStack" options={{
                        title: "Wordle", headerStyle:
                            { backgroundColor: white }, headerTitleStyle: { color: black }, headerTintColor: black
                    }} />
                    <Drawer.Screen component={SudokuStack} name="SudokuStack" options={{
                        title: "Sudoku", headerStyle:
                            { backgroundColor: white }, headerTitleStyle: { color: black }, headerTintColor: black
                    }} />
                    <Drawer.Screen component={MorpionStack} name="MorpionStack" options={{
                        title: "Ti Pwen Ti Kwa", headerStyle:
                            { backgroundColor: white }, headerTitleStyle: { color: black }, headerTintColor: black
                    }} />
                </Drawer.Navigator>
            </NavigationContainer>
        )
    }
}