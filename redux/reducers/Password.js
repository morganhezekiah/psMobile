import { GET_USER_PASSWORDS_ERROR, GET_USER_PASSWORDS_SUCCESS, ADD_PASSWORD_ERROR, ADD_PASSWORD_SUCCESS, DELETE_PASSWORD_SUCCESS, DELETE_PASSWORD_ERROR, EDIT_PASSWORD_SUCCESS, EDIT_PASSWORD_ERROR,} from "../Action";





const initialState = {
    passwords: {},
    success: false,
    message: '',
    
}


export const getUserPassword = (state = { ...initialState, count: 0 }, action) => {

    switch (action.type) {
        case GET_USER_PASSWORDS_SUCCESS:
            return {
                passwords: action.payload.passwords,
                count: action.payload.count,
                success: true,
                message: action.payload.message
            }
        case GET_USER_PASSWORDS_ERROR:
            return {
                passwords: {},
                count: 0,
                success: false,
                message: action.payload.message
            }
        
            
        default: return state;
    }
}



export const addUserPassword = (state = initialState, action) => {

    switch (action.type) {
        case ADD_PASSWORD_SUCCESS:
            return {
                passwords: action.payload.password,
                success: true,
                message: action.payload.message
            }
        case ADD_PASSWORD_ERROR:
            return {
                passwords: {},
                success: false,
                message: action.payload.message
            }
        default: return state;
    }
}


export const deletePassword = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_PASSWORD_SUCCESS:
            return {
                ...state,
                success: true,
                passwords: action.payload.password,
                message: action.payload.message
            }
        case DELETE_PASSWORD_ERROR:
            return {
                ...state,
                success: false,
                passwords: {},
                count:state.count,
                message: ""
            }
        default: return state
    }
}


export const editPassword = (state = {
    password: {},
    success: false,
    message: '',
}, action) => {
    switch (action.type) {
        case EDIT_PASSWORD_SUCCESS:
            return {
                ...state,
                success: true,
                password: action.payload.password,
                message: action.payload.message
            }
        case EDIT_PASSWORD_ERROR:
            return {
                ...state,
                success: false,
                password: {},
                message: action.payload.message
            }
        default: return state
    }
}