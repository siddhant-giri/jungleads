import { ADD_BREAKDOWNS } from '../action-constants';

export const addBreakdowns = (breakdowns) => ({
    type: ADD_BREAKDOWNS,
    data: breakdowns
})
