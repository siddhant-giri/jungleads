import { token, url } from './config';

import axios from 'axios';

export async function post(endpoint, data) {
  const params = {
    baseURL: url,
  };

  if (token) {
    params.headers = {
      authorization: token,
    };
  }
  try{
    const result = await axios.post(`${endpoint}`, data, params);
    return result;
  }catch(e){
    return e.response;
  }
}

export async function postReq(baseURL, endpoint, data) {
  const params = { baseURL };
  if(token) {
    params.headers = {
      authorization: token,
    }
  }
  try{
    const result = await axios.post(`${endpoint}`, data, params);
    return result;
  }catch(e){
    return e.response;
  }
}

export async function get(baseURL, endpoint, accessToken) {
  const params = {
    baseURL: baseURL,
  };
  
  const result = await axios.get(`${endpoint}&access_token=${accessToken}`, params);
  return result;
}

export async function getReq(baseURL, endpoint, id, query) {
  let params = {
    baseURL: baseURL,
    headers: {
      authorization: token
    },
  };
  if(query){
    params.params = query;
  }else{query = null}
  const result = await axios.get(`${endpoint}/${id}`, params);
  return result;
}

export async function deleteReq(baseURL, endpoint, id, query) {
  let params = {
    baseURL: baseURL,
    headers: {
      authorization: token
    },
  };
  if(query){
    params.params = query;
  }else{query = null}
  const result = await axios.delete(`${endpoint}/${id}`, params);
  return result;
}