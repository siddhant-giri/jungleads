import { ADD_BREAKDOWNS } from '../../actions/action-constants';

export default (state = {}, action) => {
    switch (action.type) {
        case ADD_BREAKDOWNS:
            return {
                ...state,
                breakdowns: action.data
            }
        default:
            return state;
    }
}