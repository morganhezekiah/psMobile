import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { signUp,login } from "./reducers/Auth";
import AppLoading from "./reducers/AppLoading";
import { getUserPassword,addUserPassword,deletePassword,editPassword } from "./reducers/Password";
import ServerError from "./reducers/ServerError";

const reducers = combineReducers({
    SignUp:signUp,
    Login: login,
    GetUserPassword:getUserPassword,
    AddUserPassword:addUserPassword,
    DeletePassword:deletePassword,
    EditPassword:editPassword,
    AppLoading,
    ServerError
});

const Store = createStore(reducers, applyMiddleware(thunk));
export default Store;