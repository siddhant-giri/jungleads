import {ERROR_MSG, SIGN_IN} from '../../action-constants';

import {post, getReq} from '../../../apis/proxy';
import {url} from '../../../apis/config';
import jwt from 'jsonwebtoken';

export function signInAction(params) {
    return async dispatch => {
        const {data} = await post('/users/auth', params);
        if(data.message){
            dispatch({
                type: ERROR_MSG,
                data: data.message
            })
        }else {
            const jwtDecode = jwt.decode(data);
            const userData = await getReq(url, '/users', jwtDecode.id);
            let obj = jwtDecode;
            obj.userId = jwtDecode.id;
            obj.userName = jwtDecode.sub;
            let result = userData.data === '' ? obj : userData.data;
            dispatch({
                type: SIGN_IN,
                data: result
            });
            dispatch({
                type: ERROR_MSG,
                data: null
            })
        }
    }
}
