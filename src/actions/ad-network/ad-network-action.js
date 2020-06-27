import {AD_NETWORK, LIST_AD_ACCOUNTS} from '../action-constants';

import {adAccounts} from '../../apis/fb-apis';
import {fbBaseUrl, url} from '../../apis/config';
import {get, postReq} from '../../apis/proxy';

export function getAdAccounts(accessToken){
    return async dispath => {
        const {data} = await get(fbBaseUrl, adAccounts, accessToken);
        dispath({
            type: LIST_AD_ACCOUNTS,
            data: data
        })
    }
}

export function getAdAccountUserData(data){
    return async dispatch => {
        dispatch({
            type: AD_NETWORK,
            data: data
        });
    }
}

export async function registerUserData(userData) {
    const {data} = await postReq(url, '/users/user-registration-data', userData);
    console.log(data);
}

export async function storeSurveyData(surveyData){
    const {data} = await postReq(url, '/users/survey', surveyData);
    console.log(data);
    return data;
}