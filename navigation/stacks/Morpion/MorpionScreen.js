import React from "react";
import { Appearance, StyleSheet, Text, View, Dimensions } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import MorpionDot from "./MorpionDot";
import MorpionGrid from "./MorpionGrid";
import MorpionPlayArrows from "./MorpionPlayArrows";

const CROIX = 1;
const POINT = 2;
const windowWidth = Dimensions.get("window").width;

export default class MorpionScreen extends React.Component
{
    constructor (props)
    {
        super(props);
        this.state = {
            isDark: Appearance.getColorScheme() === "dark",
            winningNumber: 4,
            currentPlayer: CROIX
        }
        this.grid = new MorpionGrid(4)
        Appearance.addChangeListener(() => this.setState({ isDark: Appearance.getColorScheme() == "dark" }))
    }
    //On change le nombre d'items nécessaires à aligner pour gagner
    changeWinningNumber(number)
    {
        this.setState({ winningNumber: number })
        this.grid = new MorpionGrid(number);
    }
    //Bouger avec les flèches
    moveSelectedDot(direction, togglingPlayer)
    {
        // console.log('toggle :', togglingPlayer)
        if (this.state.selectedRow !== undefined && this.state.selectedColumn !== undefined && togglingPlayer === this.state.currentPlayer)
        {
            switch (direction)
            {
                case "up":
                    if (this.state.selectedRow > 0) this.setState({ selectedRow: this.state.selectedRow - 1 })
                    break;
                case "down":
                    if (this.state.selectedRow < this.grid.grid.length - 1) this.setState({ selectedRow: this.state.selectedRow + 1 })
                    break;
                case "left":
                    if (this.state.selectedColumn > 0) this.setState({ selectedColumn: this.state.selectedColumn - 1 })
                    break;
                case "right":
                    if (this.state.selectedColumn < this.grid.grid[ 0 ].length) this.setState({ selectedColumn: this.state.selectedColumn + 1 })
                    break;

            }
        }
    }
    play()
    {
        //Si la case est libre (elle vaut 0) le joueur peut jouer
        if (this.grid.at(this.state.selectedRow, this.state.selectedColumn) === 0)
        {
            this.grid.play(this.state.selectedRow, this.state.selectedColumn);
            this.setState({ currentPlayer: (this.state.currentPlayer % 2) + 1 });
        }
    }

    selectDot(row, index)
    {
        // this.setState({ goldenNumber: Math.random() })
        this.setState({ selectedRow: row, selectedColumn: index })
    }

    render()
    {
        const play_grid = this.grid.grid;
        // console.log("render")
        return (
            <View style={{ ...styles.container, backgroundColor: this.state.isDark ? "black" : "white" }}>
                <View style={{
                    backgroundColor: "green", padding: 10, borderRadius: 10, position: "absolute",
                    right: 20, top: this.state.currentPlayer == CROIX ? 20 : null, bottom: this.state.currentPlayer == POINT ? 20 : null
                }}>

                </View>

                {/* Flèches avec point */}
                <View>

                    <MorpionPlayArrows player={CROIX} currentPlayer={this.grid.currentPlayer}
                        onToggleArrow={this.moveSelectedDot.bind(this)} onPlay={this.play.bind(this)} />
                </View>

                {/* grille */}
                <View style={{ ...styles.grid, borderColor: this.state.isDark ? "white" : "black" }}>
                    <FlatList data={play_grid} keyExtractor={(item, index) => index}
                        renderItem={({ item, index }) =>
                        {
                            let row = index;
                            let morpiondot_width = windowWidth / 15;
                            return <FlatList horizontal data={item} extraData={this.state.currentPlayer}
                                keyExtractor={(item, index) => row + "" + index} getItemLayout={(data, index) => (
                                    { length: morpiondot_width, offset: morpiondot_width * index, index }
                                )}
                                renderItem={({ item, index }) => (
                                    <MorpionDot value={item} row={row} column={index}
                                        onSelect={this.selectDot.bind(this)}
                                        selected={this.state.selectedColumn === index && this.state.selectedRow === row}
                                    />
                                )} />
                        }}
                    />

                </View>
                {/* Flèches avec croix */}
                <View>
                    <MorpionPlayArrows player={POINT} onToggleArrow={this.moveSelectedDot.bind(this)}
                        currentPlayer={this.grid.currentPlayer} onPlay={this.play.bind(this)} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            alignItems: "center"

        },
        grid: {
            flexDirection: "column",
            alignSelf: "center",
            flex: 1,
            borderWidth: 5,
            borderRadius: 10,
            padding: 10

        }
    }
)
