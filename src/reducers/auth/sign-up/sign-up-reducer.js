import {OTP_VERIFY, SIGN_UP} from '../../../actions/action-constants';

export default (state={}, action) => {
    switch(action.type) {
        case SIGN_UP:
            return {
                ...state,
                data: action.data
            };
        case OTP_VERIFY:
            return {
                ...state,
                otp: action.data
            };
        default:
            return state;
    };
}
