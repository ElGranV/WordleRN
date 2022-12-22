import 'react-native-gesture-handler';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { createRef, useRef, useState, forwardRef, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Button, ToastAndroid, ImageBackground, Touchable, TouchableOpacity, useColorScheme } from 'react-native';
import Navigation from './navigation/navigation';

export default function App()
{
  let [fontsLoaded] = useFonts({
    'POUTTU': require("./assets/fonts/pouttu__.ttf"),
    'bobble':require("./assets/fonts/bobbleboddy.ttf"),
    'eraser':require("./assets/fonts/EraserDust.ttf")

  });
  if (!fontsLoaded) return (<AppLoading/>)
  return(
    <Navigation/>
  )
}