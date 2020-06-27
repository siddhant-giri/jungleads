import {CHANGE_PASSWORD, EMAIL_VERIFY, ERROR_MSG} from '../../action-constants';

import {post} from '../../../apis/proxy';

export function emailAction(emailObj) {
    return async dispatch => {
        const {data} = await post('/users/forgetPassword', emailObj);
        dispatch({
            type: EMAIL_VERIFY,
            data: data
        });
    }
}

export function changePassAction(newPassObj) {
    return async dispatch => {
        const {data} = await post('/users/changePassword', newPassObj);
        
        if(data.message){
            dispatch({
                type: ERROR_MSG,
                data: data.message
            })
        }else {
            dispatch({
                type: CHANGE_PASSWORD,
                data: data
            });
            dispatch({
                type: ERROR_MSG,
                data: null
            })
        }
    }
}
