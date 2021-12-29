import { SERVER_ERROR_OCCUR, SERVER_ERROR_RESTART } from "../Action"



const initialState = {
    error:false
}


const app = (state=initialState, action)=>{
    switch(action.type){
        case SERVER_ERROR_OCCUR:
            return {
                ...state,
                error:true
            }
        case SERVER_ERROR_RESTART:
            return {
                ...state,
                error:false
            }
        default: return state
    }
}
export  default app;