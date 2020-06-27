import { getReq } from "../../../apis/proxy";
import { url } from '../../../apis/config';

import { each } from 'underscore';

import country_group from './country_group.json'

export async function getSources(userData) {
    const { data } = await getReq(`${url}`, '/audiences/sources', userData.userId,
        { fields: "name,pixel_id,subtype,approximate_count" });
    return data;
}

export async function getCountries(userData) {
    const { data } = await getReq(`${url}`, '/adsets/countries', userData.userId,
        {});
    return data;
}

export async function getCountriesGroup(userData) {
    const { data } = await getCountries(userData);
    let country_groups = [];
    each(country_group.data, group => {
        let countryCodes = []
        each(data, code => {
            if (group.country_codes.includes(code.key)) {
                countryCodes.push({
                    value: code.key,
                    label: code.name
                });
            }
        })
        country_groups.push({
            value: group.key,
            label: group.name,
            children: countryCodes
        })
    })
    return country_groups;
}