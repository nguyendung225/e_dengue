import axios from "axios";
import { TruongHopBenh } from "../model/Model";

const API_URL = process.env.REACT_APP_API_URL;
export const AddTruongHopBenh = (data: TruongHopBenh) => {
    let url = API_URL + "truong-hop-benh";
    return axios.post(url, data);
}