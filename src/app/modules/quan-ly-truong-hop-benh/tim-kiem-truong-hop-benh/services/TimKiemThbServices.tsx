import axios from "axios";
import { SearchObject } from "../../models/TimKiemTruongHopBenhModels";
const API_PATH = process.env.REACT_APP_API_URL;

export const paramsConfig = (searchObject: object) => {
  const config = { params: searchObject };
  return config;
};

export const searchByPage = (searchObject: SearchObject) => {
  const url = API_PATH + "truong-hop-benh/search";
  return axios.get(url, paramsConfig(searchObject));
};
