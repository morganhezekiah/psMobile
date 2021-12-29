import { StyleSheet } from "react-native";
import { PRIMARY_COLOR } from "../__colors__";

export default styles = StyleSheet.create({
    modal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    modalContainer: {
      backgroundColor: '#fff',
      paddingHorizontal: 16,
      paddingTop: 20,
      paddingBottom: 40,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 22,
      fontWeight: '600',
    },
    modalText: {
      fontSize: 18,
      color: '#555',
      marginTop: 14,
      textAlign: 'center',
      marginBottom: 10,
    },
    button: {
      backgroundColor: PRIMARY_COLOR,
      padding:10
    },
    buttonText: {
      color: '#fff',
      fontSize: 20,
    },
    h4:{
      fontSize:50,
      fontWeight:"bold",
      color:PRIMARY_COLOR
    },
    txt:{
      fontSize:20,
      textAlign:"center"
    }
    
  });