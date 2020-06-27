import {CHANGE_PASSWORD, EMAIL_VERIFY} from '../../../actions/action-constants';

export default (state={}, action) => {
    switch(action.type) {
        case EMAIL_VERIFY:
            return {
                ...state,
                emailVerify: action.data
            };
        case CHANGE_PASSWORD:
            return {
                ...state,
                passVerify: action.data
            };
        default:
            return state;
    };
}
