import axios from "axios";
const API_PATH = process.env.REACT_APP_API_URL;

export const getDataBaoCao = (searchObject: any) => {
    const url = API_PATH + "bao-cao/thong-tu-54";
    return axios.post(url, searchObject);
};