import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

export const getThongTinODich = (id: string) => {
    let url = API_URL + `o-dich/${id}`;
    return axios.get(url)
}

