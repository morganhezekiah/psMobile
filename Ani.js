import React from "react";
import { Text, Animated, PanResponder } from "react-native";



const Ani = () =>{
    const pan = PanResponder.create({
        onMoveShouldSetPanResponder:()=>true,
        onPanResponderMove:(e,gesture)=>{
            position.setValue({x:gesture.dx,y:gesture.dy});
        },
        onPanResponderRelease:()=>{
            Animated.spring(position,{
                toValue:{x:0,y:0},
                friction:2,
                useNativeDriver:true
            }).start()
        }
    })
    const position = new Animated.ValueXY({x:0,y:0});
        Animated.timing(position, {
            toValue:{x:200, y:250},
            duration:2000,
            useNativeDriver:true
        }).start();

    const rotate = position.x.interpolate({
        inputRange:[0,100],
        outputRange:["0deg","360deg"]
    })
    return (
        <Animated.View
            { ...pan.panHandlers }
            style={{
                backgroundColor:"#000000",
                textAlign:"center",
                width:70,
                borderRadius:20,
                marginTop:20,
                height:80,
                transform:[
                    
                    {translateX:position.x},
                    {translateY:position.y}
                ]
            }}
        >
            <Text>Morgan</Text>
        </Animated.View>
    );
};



export default Ani;