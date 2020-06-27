import {SIGN_IN} from '../../../actions/action-constants';

export default (state={}, action) => {
    switch(action.type) {
        case SIGN_IN:
            return {
                ...state,
                data: action.data
            };
        default:
            return state;
    };
}
