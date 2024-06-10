import axios from "axios";
import { IThongTinODich, ODich } from "../models/quanLyODichModels";
const API_URL = process.env.REACT_APP_API_URL;

export const getThongTinODich = (id: string) => {
    let url = API_URL + `o-dich/${id}`;
    return axios.get(url)
}

export const ketThucODich = (id: string, data: ODich) => {
    let url = API_URL + `o-dich/${id}/ket-thuc`;
    return axios.put(url, data)
}

export const editODich = (id: string, data: IThongTinODich) => {
    let url = API_URL + `o-dich/${id}`;
    return axios.put(url, data)
}

export const addNewOdich = (data: IThongTinODich) => {
    let url = API_URL + "o-dich";
    return axios.post(url, data);
}

export const deleteOdich = (id: string) => {
    let url = API_URL + `o-dich/${id}`;
    return axios.delete(url);
}