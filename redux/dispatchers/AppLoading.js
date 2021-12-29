
import { APP_LOADING, APP_NOT_LOADING } from "../Action";
const app =state => dispatch =>{
    if(state){
        dispatch({
            type:APP_LOADING,
        });
    }else{
        dispatch({
            type:APP_NOT_LOADING
        });
    }
};
export default app;