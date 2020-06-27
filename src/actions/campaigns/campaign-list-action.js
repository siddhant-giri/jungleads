import {CAMPAIGNS_LIST} from '../action-constants';

export function filterByAction(query){
    return dispatch => {
        dispatch({
            type: CAMPAIGNS_LIST,
            data: query,
        });
    }
}
