import { Dimensions, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { Icon } from "react-native-elements";


export default function MorpionPlayArrows(props)
{
    const size = Dimensions.get("window").width / 8;
    const theme = useColorScheme();
    const color = theme === "dark" ? "white" : "black"
    return (
        <View style={{ flexDirection: "column", marginVertical: 10, }} >
            {/* Flèche haut */}
            <View>
                <Icon name="triangle-up" type="entypo" onPress={() => props.onToggleArrow("up")} size={size}
                    color={color} />
            </View>

            <View style={{ flexDirection: "row" }}>
                {/* Flèche gauche*/}
                <Icon name="triangle-left" type="entypo" onPress={() => props.onToggleArrow("left")} size={size}
                    color={color} />
                {/* Bouton pour cocher une case */}
                <TouchableOpacity style={{
                    borderRadius: 50, backgroundColor: color, width: Dimensions.get("window").width / 4,
                    justifyContent: "center", alignItems: "center"
                }} onPress={props.onPlay}>
                    <Icon name={props.player == 1 ? 'close' : "circle"} color={theme === "dark" ? "black" : "white"}
                        type="font-awesome" size={size - 2} />
                </TouchableOpacity>
                {/* Flèche droite */}
                <Icon name="triangle-right" type="entypo" onPress={() => props.onToggleArrow("right")} size={size}
                    color={color} />
            </View>
            {/* Flèche bas */}
            <View>
                <Icon name="triangle-down" type="entypo" onPress={() => props.onToggleArrow("down")} size={size}
                    color={color} />
            </View>
        </View>
    )
}