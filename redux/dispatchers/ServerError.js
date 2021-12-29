import { SERVER_ERROR_OCCUR } from "../Action"


export default app =()=> dispatch =>{
    dispatch({
        type: SERVER_ERROR_OCCUR
    })
};