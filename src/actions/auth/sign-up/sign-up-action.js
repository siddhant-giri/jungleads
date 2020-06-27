import {OTP_VERIFY, SIGN_UP, ERROR_MSG} from '../../action-constants';

import {post} from '../../../apis/proxy';

export function signUpAction(userData) {
    return async dispatch => {
        const {data} = await post('/users/register', userData);
        if(data.message){
            dispatch({
                type: ERROR_MSG,
                data: data.message
            })
        }else {
            dispatch({
                type: SIGN_UP,
                data: data
            });
            dispatch({
                type: ERROR_MSG,
                data: null
            })
        }
    }
}

export function otpAction(verificationCode) {
    return async dispatch => {
        const {data} = await post('/users/otp', verificationCode);
        if(data.message){
            dispatch({
                type: ERROR_MSG,
                data: data.message
            })
        }else {
            dispatch({
                type: OTP_VERIFY,
                data: data
            });
            dispatch({
                type: ERROR_MSG,
                data: null
            })
        }
    }
}