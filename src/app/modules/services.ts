import axios from "axios";
import { paramsConfig } from "./utils/ParamsUtils";
const API_URL = process.env.REACT_APP_API_URL;

export const getListBenhChanDoan = () => {
    let url = API_URL + "benh-chan-doan/all";
    return axios.get(url);
}

export const getListDmCapDoBenh = () => {
    let codeLoaiBenh = 37;
    let url = API_URL + `dm-cap-do-benh/benh-chan-doan/${codeLoaiBenh}`;
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

export const getListHuyenByTinhId = (id: number | string | null) => {
    let url = API_URL + `huyen/tinh/${id}`
    return axios.get(url);
}

export const getListXaByHuyenId = (id: number | string | null) => {
    let url = API_URL + `xa/huyen/${id}`
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

export const getListHoatDongChongDich = () => {
    let url = API_URL + "dm-hoat-dong-phong-chong-dich/all";
    return axios.get(url);
}

export const getListDonViCongTac = (params: any) => {
    let url = API_URL + `co-so/don-vi-cong-tac/${params?.keyword}`;
    return axios.get(url);
}

export const getListCoSoXetNghiem = (params: any) => {
    let url = API_URL + `co-so/xet-nghiem/${params?.keyword}`;
    return axios.get(url);
}

export const getListCoSoDieuTri = (params: any) => {
    let url = API_URL + `co-so/co-so-dieu-tri/${params?.keyword}`;
    return axios.get(url);
}

export const getListCoSoBaoCao = (params: any) => {
    let url = API_URL + `co-so/co-so-bao-cao/${params?.keyword}`;
    return axios.get(url);
}

export const getListTuanTrongNam = (params: any) => {
    let url = API_URL + `common/week-of-year`;
    return axios.get(url, paramsConfig(params));
}

export const getListNgayTrongTuan = (params: any) => {
    let url = API_URL + `common/day-in-week`;
    return axios.get(url, paramsConfig(params));
}

export const getListTuanByNam = (params: any) => {
  const url = API_URL + "common/number-week-of-year";

  return axios.get(url, paramsConfig(params));
};