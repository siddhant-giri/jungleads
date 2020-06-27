import {AD_NETWORK, LIST_AD_ACCOUNTS} from '../../actions/action-constants';

export default (state={}, action) => {
    switch(action.type) {
        case AD_NETWORK:
            return {
                ...state,
                adAccountData: action.data
            };
        case LIST_AD_ACCOUNTS:
            return {
                ...state,
                adAccountList: action.data
            }
        default:
            return state;
    };
}
