import {SPINNER} from '../action-constants';

export function toggleSpinner(param) {
    console.log(param);
    return dispatch => {
        dispatch({
            type: SPINNER,
            data: param
        });
    }
}
