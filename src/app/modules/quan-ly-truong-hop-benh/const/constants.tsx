import { SearchObject } from "../tim-kiem-truong-hop-benh/models/TimKiemTruongHopBenhModels";

export const GENDER_OPTION = [
	{ name: "Nam", code: 1 },
	{ name: "Nữ ", code: 2 },
	{ name: "Khác", code: 3 },
];

export const SEARCH_OBJECT_INIT: SearchObject={
    name: '',
    gioiTinh: '',
    keyword: ''
}