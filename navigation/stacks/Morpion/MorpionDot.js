import React, { useEffect, useState } from "react";
import { Appearance, Dimensions, StyleSheet, TouchableOpacity, useColorScheme, View } from "react-native";
import { Icon } from "react-native-elements";

const iconName = {
    0: "circle-thin",
    1: "close",
    2: "circle",
}
//color={props.selected || props.value !== 0 ? "#DAA52F" : (theme === "dark") ? "white" : "black"}
/**
 * Elements de base de la grille de morpion
 * @param {{row, column, selected:Boolean, value:0|1|2}} props 
 * @returns 
 */

export default class MorpionDot extends React.Component
{
    constructor (props)
    {
        super(props);
        this.state = {
            isDark: Appearance.getColorScheme() === "dark"
        }
        Appearance.addChangeListener(() => this.setState({ isDark: Appearance.getColorScheme() == "dark" }))

    }
    //Permet d'améliorer dratisquement la permformance, en empêchant des render inutiles
    //lorsqu'un joueur sélection une case, ou veut jouer.
    shouldComponentUpdate(nextProps, newtState)
    {
        if (nextProps.selected === this.props.selected && nextProps.value === this.props.value) return false;
        return true
    }

    render()
    {

        return (
            <TouchableOpacity onPressIn={() =>
            {
                this.props.onSelect(this.props.row, this.props.column)
            }} delayPressIn={0}//activeOpacity={0.8}
                style={{
                    ...styles.dot, backgroundColor: this.state.isDark ? "black" : "white"
                }}>
                <Icon name={iconName[ this.props.value ]} type="font-awesome"
                    color={this.props.selected || this.props.value !== 0 ? "#DAA52F" : (this.state.isDark) ? "white" : "black"}
                    size={Dimensions.get("window").width / 15}
                />

            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create(
    {
        dot: {
            margin: 5,

        }
    }
)