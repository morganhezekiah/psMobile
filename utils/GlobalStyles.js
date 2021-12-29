import {
  StyleSheet,
} from 'react-native';


const GlobalStyle = StyleSheet.create({
    mainWrapper:{
        flex:1,
        marginTop:100,
        padding:20,
    },
    input:{
        width:"100%",
        borderColor:"#00000043",
        borderWidth:1,
        padding:10,
        textAlign:"center"
    },
    inputText:{
        opacity:0.8,
        fontSize:14
    },
    btn:{
        padding:10,
        backgroundColor:"#2076e8",

    },
    btnText:{
        color:"#ffffff",
        alignSelf:"center"
    },
    disabled:{
        opacity:0.5,
        pointerEvents:"none"
    },
    
});

export default GlobalStyle;