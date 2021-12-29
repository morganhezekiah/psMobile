import { USER_LOGIN_SUCCESS, USER_LOGIN_ERROR, USER_SIGNUP_SUCCESS, USER_SIGNUP_ERROR } from "../Action";

const initialStateSignUp = {
    user:{},
    message:"",
    success:false
}

const initialStateLogin = {
    user:{},
    message:"",
    success:false
}


export const signUp =(state =initialStateSignUp, action )=>{
    switch(action.type){
        case USER_SIGNUP_SUCCESS:
            return {
                ...state,
                user:action.payload.user,
                success:true,
                message:action.payload.message
            }
        
        case USER_SIGNUP_ERROR:
            return {
                ...state,
                email:"",
                password:"",
                success:false,
                message:action.payload.message
            }
        default:return state
    }
}


export const login =(state =initialStateLogin, action )=>{
    switch(action.type){
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                user:action.payload.user,
                success:true,
                message:action.payload.message
            }
        
        case USER_LOGIN_ERROR:
            return {
                ...state,
                user:action.payload.user,
                success:false,
                message:action.payload.message
            }
            default:return state
    }
}
