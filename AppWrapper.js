import React from "react";
import App from "./App";
import { Provider } from "react-redux";
import Store from './redux/Store';



const AppWrapper = () => {
    
    return (
        <Provider store={Store}>
            <App />
        </Provider>
    )
}


export default AppWrapper;