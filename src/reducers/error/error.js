import {ERROR_MSG} from '../../actions/action-constants';

export default (state={}, action) => {
    switch(action.type) {
        case ERROR_MSG:
            return {
                ...state,
                data: action.data
            };
        default:
            return state;
    };
}
