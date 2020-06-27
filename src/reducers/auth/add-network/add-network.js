import {ADD_NETWORK} from '../../../actions/action-constants';

export default (state={}, action) => {
    switch(action.type) {
        case ADD_NETWORK:
            return {
                ...state,
                data: action.data
            };
        default:
            return state;
    };
}
