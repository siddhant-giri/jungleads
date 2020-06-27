import * as _ from "underscore";

// ADSETS METHOD
let adsetTemp = [];
let adsetTempState = {};
let adsTemp = [];
let adsTempState = {};
let budget = null;
export function adsetMapper(data){
    _.each(data.adsets.data, (adsetData, adsetId) => {
        let adsetsObj = {};
        adsetTempState[`${adsetData.name}${adsetId}`] = adsetData.effective_status === 'ACTIVE' ? true : false;
        adsetsObj.col1 = {
          id:adsetData.id,
          accountId: adsetData.account_id,
          campaignName: adsetData.name,
          delivery: adsetData.effective_status,
          graph: '#abc',
          chart: '#abc',
          edit: '#abc',
          duplicate: '#abc'
        };

        let tempBudget = adsetData.daily_budget !== '0' ? adsetData.daily_budget : adsetData.lifetime_budget !== '0' ? adsetData.lifetime_budget : '---';
        adsetsObj.col2 = [tempBudget];
        budget = adsetsObj.col2;// FOR ADS BUDGET COLUMN
        if(adsetData.insights && adsetData.insights.data){
          let adsetInsightObj = adsetData.insights.data.find(insight => insight.account_id === data.account_id);
          if(adsetInsightObj.objective && adsetInsightObj.objective === 'PAGE_LIKES'){
            adsetsObj.col2.push('Page Likes');
            let actionResult = adsetInsightObj.actions.find(action => action.action_type === 'like');
            let actionLinkClickResult = adsetInsightObj.actions.find(action => action.action_type === 'link_click');
            let costPerActionResult = adsetInsightObj.cost_per_action_type.find(costPerAction => costPerAction.action_type === 'like');
            adsetsObj.col3 = actionResult.value;
            adsetsObj.col6 = costPerActionResult.value;
            adsetsObj.col9 = actionResult.value;
            adsetsObj.col10 = actionLinkClickResult.value;
          }
          adsetsObj.col4 = adsetInsightObj.reach || '---';
          adsetsObj.col5 = adsetInsightObj.impressions || '---';
          adsetsObj.col7 = adsetInsightObj.spend || '---';
          adsetsObj.col8 = adsetInsightObj.date_stop || '---';
        }else {
          adsetsObj.col3 = '---';
          adsetsObj.col4 = '---';
          adsetsObj.col5 = '---';
          adsetsObj.col6 = '---';
          adsetsObj.col7 = '---';
          adsetsObj.col8 = '---';
          adsetsObj.col9 = '---';
          adsetsObj.col10 = '---';
        }
        adsetTemp.push({
          col1: adsetsObj.col1,
          col2: adsetsObj.col2,
          col3: adsetsObj.col3,
          col4: adsetsObj.col4,
          col5: adsetsObj.col5,
          col6: adsetsObj.col6,
          col7: adsetsObj.col7,
          col8: adsetsObj.col8,
          col9: adsetsObj.col9,
          col10: adsetsObj.col10
        });
      });
      return {adsetTemp, adsetTempState};
}

export function adsMapper(data){
    _.each(data.ads.data, (adsData, adsetId) => {
        let adsObj = {};
        adsTempState[`${adsData.name}${adsetId}`] = adsData.effective_status === 'ACTIVE' ? true : false;
        adsObj.col1 = {
          id:adsData.id,
          accountId: adsData.account_id,
          campaignName: adsData.name,
          delivery: adsData.effective_status,
          graph: '#abc',
          chart: '#abc',
          edit: '#abc',
          duplicate: '#abc'
        };

        adsObj.col2 = budget
        if(adsData.insights && adsData.insights.data){
          let adsInsightObj = adsData.insights.data.find(insight => insight.account_id === data.account_id);
          if(adsInsightObj.objective && adsInsightObj.objective === 'PAGE_LIKES'){
            let actionResult = adsInsightObj.actions.find(action => action.action_type === 'like');
            let actionLinkClickResult = adsInsightObj.actions.find(action => action.action_type === 'link_click');
            let costPerActionResult = adsInsightObj.cost_per_action_type.find(costPerAction => costPerAction.action_type === 'like');
            adsObj.col3 = actionResult.value;
            adsObj.col6 = costPerActionResult.value;
            adsObj.col9 = actionResult.value;
            adsObj.col10 = actionLinkClickResult.value;
          }
          adsObj.col4 = adsInsightObj.reach;
          adsObj.col5 = adsInsightObj.impressions;
          adsObj.col7 = adsInsightObj.spend;
          adsObj.col8 = adsInsightObj.date_stop;
          adsObj.col11 = adsInsightObj.quality_ranking;
          adsObj.col12 = adsInsightObj.engagement_rate_ranking;
          adsObj.col13 = adsInsightObj.conversion_rate_ranking;
          adsObj.col14 = adsInsightObj.frequency;
        }else {
          adsObj.col3 = '---';
          adsObj.col4 = '---';
          adsObj.col5 = '---';
          adsObj.col6 = '---';
          adsObj.col7 = '---';
          adsObj.col8 = '---';
          adsObj.col9 = '---';
          adsObj.col10 = '---';
          adsObj.col11 = '---';
          adsObj.col12 = '---';
          adsObj.col13 = '---';
          adsObj.col14 = '---';
        }
        adsTemp.push({
          col1: adsObj.col1,
          col2: adsObj.col2,
          col3: adsObj.col3,
          col4: adsObj.col4,
          col5: adsObj.col5,
          col6: adsObj.col6,
          col7: adsObj.col7,
          col8: adsObj.col8,
          col9: adsObj.col9,
          col10: adsObj.col10,
          col11: adsObj.col11,
          col12: adsObj.col12,
          col13: adsObj.col13,
          col14: adsObj.col14
        });
      });
      
      return {adsTemp, adsTempState};
}