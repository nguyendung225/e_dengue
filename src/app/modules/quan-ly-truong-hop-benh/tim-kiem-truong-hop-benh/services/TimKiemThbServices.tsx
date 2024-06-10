import axios from "axios";
import { CheckTrungParams, SearchObjectModel } from "../../models/TimKiemTruongHopBenhModels";
const API_PATH = process.env.REACT_APP_API_URL;

export const paramsConfig = (searchObject: object) => {
  const config = { params: searchObject };
  return config;
};

export const searchThbByPage = (searchObject: SearchObjectModel) => {
  const url = API_PATH + "truong-hop-benh/search";
  return axios.get(url, paramsConfig(searchObject));
};

export const searchThbOdichByPage = (searchObject: SearchObjectModel) => {
    const url = API_PATH + "truong-hop-benh/search/o-dich";
    return axios.get(url, paramsConfig(searchObject));
};

export const checkTrungTruongHopBenh = (searchObject: CheckTrungParams) => {
  const url = API_PATH + "truong-hop-benh/check-trung";
  return axios.get(url, paramsConfig(searchObject));
}
