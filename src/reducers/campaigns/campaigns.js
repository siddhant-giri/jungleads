import {CREATE_CAMPAIGN, CREATE_ADSETS, CREATE_AD_CREATIVE, CREATE_ADS, CAMPAIGNS_LIST} from '../../actions/action-constants';

export default (state={}, action) => {
    switch(action.type) {
        case CREATE_CAMPAIGN:
            return {
                ...state,
                campaignsData: action.data
            };
        case CREATE_ADSETS:
            return {
                ...state,
                adsetsData: action.data
            }
        case CREATE_AD_CREATIVE:
            return {
                ...state,
                adCreativesData: action.data
            }
        case CREATE_ADS:
            return {
                ...state,
                ads: action.data
            }
        case CAMPAIGNS_LIST:
            return {
                ...state,
                campaignsList: { filterQuery: action.data }
            }
        default:
            return state;
    };
}
