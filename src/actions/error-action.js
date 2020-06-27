import {ERROR_MSG} from './action-constants';

export function clearError(){
    return dispatch => {
        dispatch({
            type: ERROR_MSG,
            data: null
        })
    }
}
