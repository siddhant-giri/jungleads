import {CREATE_CAMPAIGN, ERROR_MSG} from '../action-constants';

import {postReq, getReq, deleteReq} from '../../apis/proxy';
import {url} from '../../apis/config';

export async function getPaymentMethod(userData) {
    const {data} = await postReq(url, '/campaigns/payment-method', userData);
    return data;
}

export async function getCampaignsList(userData) {
    const {data} = await getReq(url, '/campaigns/campaigns-lists', userData.userId, {
        ad_account_id: userData.adAccountId
      });
    return data.data;
}

export async function getCampaigns(userData) {
    const {data} = await getReq(url, '/campaigns', userData.userId, {ad_account_id: userData.adAccountId});
    return data.data;
}

export async function createCampaignCopies(userData){
    const {data} = await postReq(url, '/campaigns/copy', userData);
    return data;
}

export async function deleteCampaign(userData) {
    const {data} = await deleteReq(url, '/campaigns/delete-campaign', userData.userId, {campaignId: userData.campaignId});
    return data;
} 

export async function editCampaign(userData){
    const {data} = await postReq(url, 'campaigns/edit-campaign', userData);
    return data;
}

export function createCampaign(campaignData) {
    return async dispatch => {
        const {data} = await postReq(url, '/campaigns', campaignData);
        if(data.message){
            dispatch({
                type: ERROR_MSG,
                data: data.message
            })
        }else {
            dispatch({
                type: CREATE_CAMPAIGN,
                data: data
            });
            dispatch({
                type: ERROR_MSG,
                data: null
            })
        }
    }
}

export function useCampaign(campaignData){
    return async dispatch => {
        campaignData.success = true;
        dispatch({
            type: CREATE_CAMPAIGN,
            data: campaignData
        });
    }
}

export async function getCampaignData(userData) {
  const {data} = await getReq(url, '/campaigns/list', userData.userId, {campaign_id: userData.campaignId});
  return data.data;
}