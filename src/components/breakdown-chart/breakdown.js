import { url } from '../../apis/config';

import { getReq } from '../../apis/proxy';

export async function getBreakdowns(params) {
    const result = await getReq(url,
        `${'breakdowns'}`, params.userId,
        {
            adset_id: params.adset_id,
            since: getFormattedDate(params.date_start),
            until: getFormattedDate(params.date_end)
        })
    return result;
}

function getFormattedDate(date) {
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
}