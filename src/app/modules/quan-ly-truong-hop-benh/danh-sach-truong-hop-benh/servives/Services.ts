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

export const updateXacNhanTrangThaiTHB = (id: number, data: any) => {
    let url = API_URL + `truong-hop-benh/${id}/xac-nhan-trang-thai`;
    return axios.put(url, data)
}

export const exportFileMau = () => {
    const url = API_URL + 'truong-hop-benh/import-excel/download-file-template'
    return axios({
        url: url,
        method: "GET",
        responseType: "blob",
    });
}

export const exportFileHanhChinh = () => {
    const url = API_URL + 'truong-hop-benh/import-excel/download-file-tinh-huyen-xa'
    return axios({
        url: url,
        method: "GET",
        responseType: "blob",
    });
}

export const exportInvalidTHB = (id: string) => {
    const url = API_URL + 'truong-hop-benh/import-excel/download-file-error'
    return axios({
        url: url,
        method: "GET",
        responseType: "blob",
        params: { fileUploadId: id }
    });
}

export const importValidTHB = (id: string) => {
    const url = API_URL + 'truong-hop-benh/import-excel/save'
    return axios({
        url: url,
        method: "GET",
        responseType: "blob",
        params: { fileUploadId: id }
    });
}

export const fileUpload = (file: File) => {
    let url = `${API_URL}truong-hop-benh/import-excel/upload-file`;
    let formData = new FormData();
    formData.append(`file`, file);
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    };
    return axios.post(url, formData, config);
};

export const checkData = (id: string) => {
    let url = API_URL + `truong-hop-benh/import-excel/check-data`;
    return axios.get(url, {
        params: { fileUploadId: id },
    });
}
