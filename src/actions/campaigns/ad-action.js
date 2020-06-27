import { CREATE_ADS, CREATE_AD_CREATIVE, ERROR_MSG } from "../action-constants";

import { postReq, getReq } from "../../apis/proxy";
import { url } from "../../apis/config";
import { getBase64 } from '../../lib/method';

export async function uploadImg(imgData) {
  const { data } = await postReq(url, `/adsets/adimages`, imgData);
  return data;
}

export async function uploadVideo(videoData) {
  let obj = {
    name: videoData.name,
    userId: videoData.userId,
    adAccountId: videoData.adAccountId,
  }

  const videoBase64 = await getBase64(videoData.source);
  // getBase64(videoData.source).then(res => {
  //   return obj.file = res
  // });
  obj.file = videoBase64;
  const data = await postReq(url, `/adsets/advideos`, obj);
  // const {data} = axios.post()
  return data;
}

export async function getImgs(userData) {
  const { data } = await getReq(url, `/adsets/adcreatives/images`, userData.userId, {
    ad_account_id: userData.adAccountId
  });
  return data;
}

export async function getVideos(userData) {
  const { data } = await getReq(url, `/adsets/adcreatives/videos`, userData.userId, {
    ad_account_id: userData.adAccountId
  });
  return data;
}

export async function createAdCopies(userData){
  const {data} = await postReq(url, '/ads/copy', userData);
  return data;
}

export function createAds(adsData){
  return async dispatch => {
    const { data } = await postReq(
      url,
      '/ads',
      adsData
    );
    console.log(data);
    if(data.message){
      dispatch({
        type: ERROR_MSG,
        data: data.message
      });
    }else {
      dispatch({
        type: CREATE_ADS,
        data: data
      });
      dispatch({
        type: ERROR_MSG,
        data: null,
      });
    }
  }
}

export function createAdCreatives(adCreativeData) {
  return async dispatch => {
    const { data } = await postReq(
      url,
      "/adsets/adCreatives/create",
      adCreativeData
    );
    console.log(data);
    if (data.message) {
      dispatch({
        type: ERROR_MSG,
        data: data.message
      });
    } else {
      dispatch({
        type: CREATE_AD_CREATIVE,
        data: data
      });
      dispatch({
        type: ERROR_MSG,
        data: null
      });
    }
  };
}
