import { Dimensions, StyleSheet, TouchableOpacity, useColorScheme, View } from "react-native";
import { Icon } from "react-native-elements";

const iconName = {
    0: "circle-thin",
    1: "close",
    2: "circle-thin",
}
//color={props.selected || props.value !== 0 ? "#DAA52F" : (theme === "dark") ? "white" : "black"}
export default function MorpionDot(props)
{
    const theme = useColorScheme();
    return (
        <TouchableOpacity onPressIn={props.onSelect} activeOpacity={0.8}
            style={{
                ...styles.dot, backgroundColor: theme === "dark" ? "black" : "white"
            }}>
            <Icon name={iconName[ props.value ]} type="font-awesome"
                color={props.selected || props.value !== 0 ? "#DAA52F" : (theme === "dark") ? "white" : "black"}
                size={Dimensions.get("window").width / 15}
            />

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create(
    {
        dot: {
            margin: 5
        }
    }
)