import axios from "axios";
import { ISearchObjModel } from "../models/quanLyODichModels";
import { paramsConfig } from "../../utils/ParamsUtils";
const API_PATH = process.env.REACT_APP_API_URL;

export const searchODichByPage = (searchObject: ISearchObjModel) => {
    const url = API_PATH + "o-dich/search";
    return axios.get(url, paramsConfig(searchObject));
};