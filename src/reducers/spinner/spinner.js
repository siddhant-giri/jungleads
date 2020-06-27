import {SPINNER} from '../../actions/action-constants';

export default (state={data: false}, action) => {
    switch(action.type) {
        case SPINNER:
            return {
                ...state,
                data: action.data
            };
        default:
            return state;
    };
}
