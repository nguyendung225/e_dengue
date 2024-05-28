import { APIResponse } from "./models/models";
import axios, { AxiosResponse } from "axios";
import { paramsConfig } from "./utils/ParamsUtils";
const API_URL = process.env.REACT_APP_API_URL;

export const getListBenhChanDoan = () => {
    let url = API_URL + "benh-chan-doan/all";
    return axios.get(url);
}

export const getListDmCapDoBenh = () => {
    let url = API_URL + "dm-cap-do-benh/all";
    return axios.get(url);
}

export const getListCoSo = () => {
    let url = API_URL + "co-so/all";
    return axios.get(url);
}

export const getListDanToc = () => {
    let url = API_URL + "dan-toc/all";
    return axios.get(url);
}

export const getListDmDonViThucHienXetNghiem = () => {
    let url = API_URL + "dm-don-vi-thuc-hien-xet-nghiem/all";
    return axios.get(url);
}

export const healthCheck = () => {
    let url = API_URL + "health-check";
    return axios.get(url);
}

export const getListDmHoatDongPhongChongDich = () => {
    let url = API_URL + "dm-hoat-dong-phong-chong-dich/all";
    return axios.get(url);
}

export const getListHuyen = () => {
    let url = API_URL + "huyen/all";
    return axios.get(url);
}

export const getListNgheNghiep = () => {
    let url = API_URL + "nghe-nghiep/all";
    return axios.get(url);
}

export const getListDmPhuongPhapThucHien = () => {
    let url = API_URL + "dm-phuong-phap-thuc-hien/all";
    return axios.get(url);
}

export const getListQuocGia = () => {
    let url = API_URL + "quoc-gia/all";
    return axios.get(url);
}

export const getListThon = () => {
    let url = API_URL + "thon/all";
    return axios.get(url);
}

export const getPagedThon = () => {
    let url = API_URL + "thon/page";
    return axios.get(url);
}

export const getListTinh = () => {
    let url = API_URL + "tinh/all";
    return axios.get(url);
}

export const getListDmTinhTrangHienTai = () => {
    let url = API_URL + "dm-tinh-trang-hien-tai/all";
    return axios.get(url);
}

export const getListVungMien = () => {
    let url = API_URL + "vung-mien/all";
    return axios.get(url);
}

export const getListXa = () => {
    let url = API_URL + "xa/all";
    return axios.get(url);
}