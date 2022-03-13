import { StatusBar } from 'expo-status-bar';
import { createRef, useRef, useState, forwardRef, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import words from "./mots";

const yellow = "rgb(201, 180, 88)"
const green = "rgb(106,170,100)"

function charIsCorrect(char)
{
  return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(char) && char.length
}

const Case = forwardRef( function Case(props, ref)
{
  let char = "", content = "";
  const [color, setColor] = useState("gray")
  
  return (
    <TextInput style={{...styles.case, backgroundColor:props.submitted?color:"grey"}} ref = {ref}
    onChangeText={(text)=>{
      
      if (charIsCorrect(text)) props.onCharChange(text);
      
      
      if (props.nextRef && text.length) props.nextRef.current.focus();
      content = text;
      console.log(text + " in " + props.word + " : "+(props.word.includes(text)&&charIsCorrect(text))+" ["+props.index+"]")
      
      if (props.word[props.index]===text) setColor(green)
      else 
        {
          if (props.word.includes(text) && charIsCorrect(text)) setColor(yellow)
          else setColor("gray")
        }
      
      
      if (!text) setColor("gray")
        
      
      
    }} maxLength={1} onKeyPress={({nativeEvent})=>{
      if (nativeEvent.key=="Backspace" && props.prevRef && char=="Backspace") props.prevRef.current.focus()
      if (nativeEvent.key == " " && content) props.nextRef.current.focus() 
      char = nativeEvent.key

    }} 
    editable =  {!props.disabled} autoCapitalize='characters'/>
  )
})
function Line(props)
{
  const refs = [];
  for (let i = 0; i<5; i++) refs.push(useRef())
  return (
    <View style={styles.line}>
      {[0, 1, 2, 3, 4].map(((value, index)=><Case index={index} key={value} ref = {refs[value]} nextRef = {value<4?refs[value+1]:null}
                    onCharChange = {()=>{}} prevRef = {value>0?refs[value-1]:null}
                    disabled={props.number != props.current} submitted = {props.submitted}
                    word = {props.word}/>))}
    </View>
  )
}


export default function App() {
  const [lineNumber, setLineNumber] = useState(1)
  const [word, setWord] = useState(words[Math.floor(Math.random()*(words.length-300))])
  console.log("word is :", (word));
  useEffect(()=>{
    
  }, [])
  const proposition = {text : "     "}
  return (
    <View style={styles.container}>
      <Text>Bienvenue dans Wordle BASH !</Text>
      {[1,2,3,4,5,6].map(value=>(
      <Line number = {value} key = {value} current = {lineNumber} edit = 
      {(text)=>proposition.text = text} word = {word} submitted = {value < lineNumber}/>))}

      <Button onPress = {()=>{
        setLineNumber(lineNumber+1);}} title= "Soumettre"/>
        {lineNumber>6?<Text>La solution était {word}</Text>:null}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  case:{
    width:60, 
    height:60,
    backgroundColor:"grey",
    alignContent:"center",
    color:"white",
    fontSize:25,
    textAlign:"center",
    marginHorizontal:3,
    borderRadius:6
  
  },
  line:{
    flexDirection:"row",
    marginBottom:5
  }
});
