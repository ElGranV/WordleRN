import { StatusBar } from 'expo-status-bar';
import { createRef, useRef, useState, forwardRef, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ToastAndroid, ImageBackground, Touchable, TouchableOpacity, useColorScheme } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Icon } from 'react-native-elements';
const playable_words = require("./mot_jouables.json")
const possible_words = require("./mots_possibles.json")

// import font from "./assets/fonts/POUTTU__"

const yellow = "rgb(201, 180, 88)"
const green = "rgb(106,170,100)"
const gris_clair = "rgb(200,200, 200)"

function charIsCorrect(char)
{
  return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(char) && char.length
}

const Case = forwardRef(function Case(props, ref)
{
  let char = "", content = "";
  const [ color, setColor ] = useState("gray")
  useEffect(() =>
  {
    ref.current.refresh = () => setColor("gray")
  }, [ ref ])

  return (
    <TextInput style={{ ...styles.case, backgroundColor: props.submitted ? color : "grey" }} ref={ref}
      onChangeText={(text) =>
      {

        if (charIsCorrect(text)) props.onCharChange(text);


        if (props.nextRef && text.length) props.nextRef.current.focus();
        content = text;
        console.log(text + " in " + props.word + " : " + (props.word.includes(text) && charIsCorrect(text)) + " [" + props.index + "]")

        if (props.word[ props.index ] === text) setColor(green)
        else 
        {
          if (props.word.includes(text) && charIsCorrect(text)) setColor(yellow)
          else setColor(gris_clair)
        }
        if (!text) setColor(gris_clair)


      }} maxLength={1} onKeyPress={({ nativeEvent }) =>
      {
        if (nativeEvent.key == "Backspace" && props.prevRef && char == "Backspace") props.prevRef.current.focus()
        if (nativeEvent.key == " " && content) props.nextRef.current.focus()
        char = nativeEvent.key

      }}
      editable={!props.disabled} autoCapitalize='characters' />
  )
})

//Le component pour une ligne 
const Line = forwardRef(function (props, refs)
{
  const proposition = useRef([ "", "", "", "", "" ])

  return (
    <View style={styles.line}>
      {[ 0, 1, 2, 3, 4 ].map(((value, index) =>
        <Case index={index} key={value} ref={refs.current[ value ]} nextRef={value < 4 ? refs.current[ value + 1 ] : null}
          onCharChange={(char) =>
          {
            proposition.current[ value ] = char;
            props.setCurrentProposition(proposition.current.join(""))
          }} prevRef={value > 0 ? refs.current[ value - 1 ] : null}
          disabled={props.number != props.current} submitted={props.submitted}
          word={props.word} />))}
    </View>
  )
})


export default function WordleScreen({ navigation, route })
{

  const [ scheme ] = useColorScheme()
  const [ lineNumber, setLineNumber ] = useState(1)
  const [ word, setWord ] = useState(possible_words[ Math.floor(Math.random() * possible_words.length) ])
  const proposition = useRef("@")
  const refs = useRef([ 1, 2, 3, 4, 5, 6 ].map((value) =>
  {
    let tab = useRef([])
    for (let i = 0; i < 5; i++) tab.current.push(useRef())
    return tab
  }))

  //Importation des polices


  let white = (scheme == "l") ? "white" : "rgb(30, 30, 30)"
  let black = (scheme !== "l") ? "white" : "rgb(30, 30, 30)"

  //Chemin de l'image de fond en fonction du thème (light ou dark)
  const background_img = (scheme == "l") ? require("./letters-background1.jpg") : require("./letters-background2.jpg")

  return (
    <ImageBackground style={styles.container} source={background_img}>
      <View style={{ backgroundColor: white, padding: 30, paddingHorizontal: 30, borderRadius: 30 }}>
        <Text style={{ ...styles.title, color: black }}>Bienvenue dans{"\n"}<Text style={{
          color: green, fontSize: 45,
          alignSelf: "center"
        }}>Wordle BASH !</Text></Text>

        {[ 1, 2, 3, 4, 5, 6 ].map((value, index) => (
          <Line number={value} key={value} current={lineNumber} edit=
            {(text) => proposition.text = text} ref={refs.current[ index ]} word={word} submitted={value < lineNumber}
            setCurrentProposition={(p) => proposition.current = p} />))}

        <TouchableOpacity style={styles.button} onPress={() =>
        {
          if (proposition.current.length && possible_words.includes(proposition.current))
            setLineNumber(lineNumber + 1)
          else ToastAndroid.show("Le mot que vous avez entré n'est pas dans la liste :(", ToastAndroid.SHORT)
            ;
        }}>
          <Text style={{ color: "white", alignSelf: "center", fontFamily: "POUTTU" }}>SOUMETTRE</Text>
        </TouchableOpacity>

        {lineNumber > 6 ? <Text style={{ color: scheme === "l" ? "black" : "white" }}>La solution était {word}</Text> : null}
        <StatusBar style="auto" />
      </View>
      <TouchableOpacity style={{
        backgroundColor: green, borderRadius: 50, padding: 20, alignSelf: "flex-end", marginTop: 10,
        marginRight: 4
      }}
        onPress={() =>
        {
          for (let line of refs.current)
          {
            for (let box of line.current)
            {
              box.current.clear()

            }
          }
          proposition.current = "";
          setWord(possible_words[ Math.floor(Math.random() * possible_words.length) ])
          setLineNumber(1)
        }}>
        <Icon name="refresh" type="font-awesome" color={white} size={35} />
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: "bobble",
    fontSize: 35,
    alignSelf: "center",
    marginBottom: 10
  },
  case: {
    width: 60,
    height: 60,
    backgroundColor: "grey",
    alignContent: "center",
    color: "white",
    fontSize: 25,
    textAlign: "center",
    marginHorizontal: 3,
    borderRadius: 6

  },
  line: {
    flexDirection: "row",
    marginBottom: 5
  },
  button: {
    padding: 20,
    backgroundColor: green,
    borderRadius: 12,
    marginTop: 5,
    marginBottom: 10
  }
});
