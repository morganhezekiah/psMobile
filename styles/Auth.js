import { StyleSheet  }  from "react-native";

const style = StyleSheet.create({
    mainWrapper :{
        flex:1,
        alignItems:"center",
        backgroundColor:"#ffffff"
    },
    subWrapper:{
        width:"70%",
        marginTop:40,
    },
    title:{
        textAlign:"center",
        color:"#fbbc05",
        textDecorationLine:"underline",
        fontSize:20,
    },
    form:{
        wrapper:{
            marginTop:10
        },
        inputText:{
            width:"100%",
            borderColor:"#00000078",
            borderWidth:1,
            borderRadius:0,
            paddingHorizontal:15
        },
        text:{
            fontSize:16,
            marginTop:10,
        },
        btn:{
            main:{
                marginTop:10,
                backgroundColor:"#4caf50",
                
            },
            text:{
                textAlign:"center",
                color:"#ffffff"
            }
        }
    },
    seePassword: {
        wrapper: {
          position:"relative"
        },
        icon: {
          position:"absolute",
          right:20,
          top:"30%"
        }
      },
      loadingSpinner: {
        wrapper: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%"
        }
      },
      greyText:{
          color:"#00000067",
          fontSize:14
      },
      heavyText:{
          color:"#000000",
          fontSize:17,
      },
      floatBtn: {
        position: "absolute",
        bottom: 20,
        right: 10,
        padding: 20,
        backgroundColor: "#34a853",
        borderRadius: 40,
        elevation: 10
    }
});


export default style;