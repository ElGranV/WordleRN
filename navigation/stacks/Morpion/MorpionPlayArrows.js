import { Dimensions, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { Icon } from "react-native-elements";

/**
 * Manette de jeu
 * @param {{player:number, onToggleArrow, onPlay, currentPlayer:number}} props 
 * @returns 
 */
export default function MorpionPlayArrows(props)
{
    const size = Dimensions.get("window").width / 8;
    const theme = useColorScheme();
    const color = theme === "dark" ? "white" : "black"
    return (
        <View style={{ flexDirection: "column", marginVertical: 10, }} >
            {/* Flèche haut */}
            <View>
                <Icon name="triangle-up" type="entypo" onPress={() => props.onToggleArrow("up", props.player)} size={size}
                    color={color} />
            </View>

            <View style={{ flexDirection: "row" }}>
                {/* Flèche gauche*/}
                <Icon name="triangle-left" type="entypo" onPress={() => props.onToggleArrow("left", props.player)} size={size}
                    color={color} />
                {/* Bouton pour cocher une case */}
                <TouchableOpacity style={{
                    borderRadius: 50, backgroundColor: color, width: Dimensions.get("window").width / 4,
                    justifyContent: "center", alignItems: "center"
                }} onPress={() => { if (props.player === props.currentPlayer) props.onPlay() }}>
                    <Icon name={props.player == 1 ? 'close' : "circle"} color={theme === "dark" ? "black" : "white"}
                        type="font-awesome" size={size - 2} />
                </TouchableOpacity>
                {/* Flèche droite */}
                <Icon name="triangle-right" type="entypo" onPress={() => props.onToggleArrow("right", props.player)} size={size}
                    color={color} />
            </View>
            {/* Flèche bas */}
            <View>
                <Icon name="triangle-down" type="entypo" onPress={() => props.onToggleArrow("down", props.player)} size={size}
                    color={color} />
            </View>
        </View>
    )
}