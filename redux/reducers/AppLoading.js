import { APP_LOADING, APP_NOT_LOADING } from "../Action";

const initialState = {
    loading:false,
}


const app = (state=initialState, action)=>{
    switch (action.type){
        case APP_LOADING:
            return {...state, loading:true}
        case APP_NOT_LOADING:
            return {...state, loading:false}
        default: return state

    }
}
export default app;