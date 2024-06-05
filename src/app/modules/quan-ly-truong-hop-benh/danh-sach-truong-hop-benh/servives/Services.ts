import axios from "axios";
import { TruongHopBenh } from "../model/Model";

const API_URL = process.env.REACT_APP_API_URL;

export const AddTruongHopBenh = (data: TruongHopBenh) => {
    let url = API_URL + "truong-hop-benh";
    return axios.post(url, data);
}

export const getThongTinTruongHopBenh = (id: string) => {
    let url = API_URL + `truong-hop-benh/${id}`;
    return axios.get(url)
}

export const getThongTinTienSuBenh = (id: number) => {
    let url = API_URL + `truong-hop-benh/${id}/tien-su-benh`;
    return axios.get(url)
}
export const getThongTinXacNhan = (id: number) => {
    let url = API_URL + `truong-hop-benh/${id}/lich-su-xac-nhan`;
    return axios.get(url)
}

export const getThongTinTheoDoi = (id: number) => {
    let url = API_URL + `truong-hop-benh/${id}/lich-su-theo-doi`;
    return axios.get(url)
}

export const deleteTruongHopBenh = (id: number) => {
    let url = API_URL + `truong-hop-benh/${id}`;
    return axios.delete(url)
}

export const updateTruongHopBenh = (id: number, data: TruongHopBenh) => {
    let url = API_URL + `truong-hop-benh/${id}`;
    return axios.put(url, data)
}

export const exportWordFile = (id: number) => {
    const url = API_URL + `truong-hop-benh/${id}/export-word`;
    return axios({
        url: url,
        method: "GET",
        responseType: "blob",
    });
}

export const exportPdfFile = (id: number) => {
    const url = API_URL +`truong-hop-benh/${id}/export-pdf`;
    return axios({
        url: url,
        method: "GET",
        responseType: "blob",
    });
}