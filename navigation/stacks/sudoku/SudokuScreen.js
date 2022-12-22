import React, { forwardRef, useRef, useState } from "react";
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Dimensions, Animated, Easing, Platform, ToastAndroid, ImageBackground, Appearance } from "react-native";
import { Icon } from "react-native-elements";
import { generate_playable_grid, generate_random_full_grid, gridsAreEqual, verify_grid, } from "./SudokuGrid";

const windowWidth = Dimensions.get("screen").width
const windowHeight = Dimensions.get("screen").height
const blue = "rgb(58,180,255)"
const dark_blue = "rgb(58,160,255)"
const light_blue = "rgba(58,180,255,0.2)"
const gray = "rgb(100,100,100)"
const dark_gray = "rgb(25,25,25)"

function isValidNumber(str)
{
    return "123456789".includes(str) && str
}

const Case = forwardRef(function (props, ref)
{

    const [ number, setNumber ] = useState(props.number === 0 ? "" : props.number + "")
    const [ test_mode, setMode ] = useState(props.testMode)
    let color = "black";
    if (props.number === 0)
    {
        if (selected) color = test_mode ? dark_gray : dark_blue;
        else color = test_mode ? gray : blue
    }

    let selected = (props.selectedLine === props.line || props.selectedCol === props.column ||
        Math.floor((props.line - 1) / 3) === Math.floor((props.selectedLine - 1) / 3) &&
        Math.floor(props.column / 3) === Math.floor(props.selectedCol / 3))

    return (
        <TextInput onChangeText={(input) =>
        {
            if (isValidNumber(input) || input === "") 
            {
                if (test_mode !== props.testMode) setMode(props.testMode)
                setNumber(input);
                props.inputNumber(input !== "" ? parseInt(input) : 0, props.line - 1, props.column)
            }

        }} maxLength={1} keyboardType="numeric"
            value={number} onFocus={() => props.onFocusedCase(props.line, props.column)}
            style={{
                ...styles.case,
                backgroundColor: selected ? light_blue : null,
                color: color,
                borderTopWidth: props.line % 3 === 1 ? 2 : 0.5,
                borderBottomWidth: props.line === 9 ? 2 : 0.5,
                borderLeftWidth: props.index === 1 ? 2 : 0.5,
                borderRightWidth: props.index % 3 === 0 ? 2 : 0.5
            }} editable={props.number === 0} />
    )
})

const Line = forwardRef(function (props, ref)
{
    const cases = useRef([ 1, 2, 3, 4, 5, 6, 7, 8, 9 ])
    return (
        <View style={styles.line}>
            {
                cases.current.map((value, index) => (
                    <Case key={index} line={props.number} index={value} column={index}
                        number={props.line[ index ]} inputNumber={props.inputNumber}
                        onFocusedCase={props.onFocusedCase} selectedLine={props.selectedLine}
                        selectedCol={props.selectedCol} testMode={props.testMode} />
                ))
            }
        </View>
    )
})

export default class SudokuScreen extends React.Component
{
    constructor (props)
    {
        super(props);
        this.lines = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
        this.state = {
            level: 1,
            animatedColor: new Animated.Value(0),
            gridIsValid: true,
            verifyCounter: 0,
            testMode: false,
            lightMode: Appearance.getColorScheme() == "light",
            selectedLine: -1,
            selectedCol: -1
        }
        Appearance.addChangeListener(() =>
        {
            this.setState({ lightMode: Appearance.getColorScheme() == "light" })
        })
        this.generateNewGrid(true)


    }

    generateNewGrid(firstTime = false)
    {
        this.full_grid = generate_random_full_grid()
        this.playable_grid = generate_playable_grid(this.full_grid, this.state.level)
        this.player_grid = this.playable_grid.map(line => [].concat(line))
        if (!firstTime) this.setState({ verifyCounter: 0 })
    }

    render()
    {
        const bg_img = this.state.lightMode ? require("../../../assets/numbers-background.jpg") : require("../../../assets/numbers-background2.jpg")
        const white = this.state.lightMode ? "white" : "black";
        const black = this.state.lightMode ? "black" : "white";

        return (
            <ImageBackground style={styles.container} source={bg_img}
                imageStyle={{ width: windowWidth, height: windowHeight }}>

                <Animated.View style={{
                    borderRadius: 10, paddingVertical: 20,
                    backgroundColor: this.state.animatedColor.interpolate({
                        inputRange: [ 0, 1, 2 ],
                        outputRange: this.state.gridIsValid ? [ 'rgba(255,255,255,1)', 'rgba(156,255,136,0.7)', 'rgba(255,255,255,1)' ] :
                            [ "white", "red", "white" ],
                        useNativeDriver: false
                    })
                }}>

                    <Text style={styles.title}>SUDOKU</Text>


                    {/*Grille */
                        this.lines.map((value, index) => (
                            <Line key={index} number={value} line={this.playable_grid[ index ]}
                                inputNumber={(number, i, j) =>
                                {
                                    this.player_grid[ i ][ j ] = number;
                                    //console.log(this.player_grid)
                                }} selectedLine={this.state.selectedLine} selectedCol={this.state.selectedCol}
                                onFocusedCase={(i, j) => { this.setState({ selectedLine: i, selectedCol: j }) }}
                                testMode={this.state.testMode} />
                        ))
                    }
                    {/* Indications en bas de la grille */}
                    <View style={{ flexDirection: "column", marginTop: 5, alignSelf: "center" }}>
                        <Text style={{ fontSize: 15, fontFamily: "POUTTU" }}>
                            Mode "Je teste sans savoir"</Text>
                        <Icon name="pencil" size={35} type="font-awesome" onPress={() => this.setState({ testMode: !this.state.testMode })}
                            color={this.state.testMode ? blue : gray} />
                    </View>
                    {/* Bouton pour vérifier la grille. Elle apparaît en vert si la grille est bonne.*/}
                    <TouchableOpacity style={{
                        ...styles.button,
                        backgroundColor: this.state.verifyCounter < 3 ? dark_blue : "grey"
                    }} disabled={this.state.verifyCounter >= 3}
                        onPress={() =>
                        {

                            this.setState({
                                gridIsValid: gridsAreEqual(this.full_grid, this.player_grid),
                                verifyCounter: this.state.verifyCounter + 1
                            }, () =>
                            {
                                let TRANSPARENT = 2;
                                let GREEN = 1;
                                let animation = Animated.timing(this.state.animatedColor, {
                                    toValue: TRANSPARENT, duration: 1000,
                                    useNativeDriver: false
                                })
                                animation.start(() => { animation.reset() })

                                if (Platform.OS === "android")
                                {
                                    if (this.state.gridIsValid) ToastAndroid.show("La grille est valide", ToastAndroid.SHORT)
                                    else ToastAndroid.show("Des erreurs ont été détectées", ToastAndroid.SHORT)
                                }
                            })
                        }}>
                        <Text style={{
                            color: "white", alignSelf: "center", fontFamily: "eraser", fontSize: 25,
                        }}>VERIFIER (x {3 - this.state.verifyCounter})</Text>
                    </TouchableOpacity>
                </Animated.View>

            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            alignContent: "center",


        },

        title: {
            fontFamily: "eraser",
            fontSize: 45,
            alignSelf: "center",
            marginBottom: 5
        },
        case: {
            borderWidth: 0.5,
            width: windowWidth / 10,
            height: windowWidth / 10,
            padding: 3,
            fontSize: 25,
            justifyContent: "center",
            textAlign: "center",
            fontFamily: "eraser"

        },
        line: {
            flexDirection: "row",
            alignSelf: "center",
        },

        button: {
            padding: 18,
            borderRadius: 12,
            marginTop: 5,
            marginBottom: 10,
            alignSelf: "center",
            width: windowWidth * 0.85,
            marginTop: 10
        }
    }
)