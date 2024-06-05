import { doiTuongMacBenh, truongHopBenh } from "../../quan-ly-truong-hop-benh/danh-sach-truong-hop-benh/model/Model";

export interface ISearchObjModel {
    keyword?: string;
    tinhId?: string;
    huyenId?: string;
    xaId?: string;
    ngayKhoiPhatTuNgay?: string;
    ngayKhoiPhatDenNgay?: string;
    ngayTaoBaoCaoTuNgay?: string;
    ngayTaoBaoCaoDenNgay?: string;
    ngayKetThucTuNgay?: string;
    ngayKetThucDenNgay?: string;
    trangThaiId?: string;
    donViBaoCaoId?: string;
    PageNumber?: number;
    PageSize?: number;
}

export const initalSearchObject = {
    PageNumber: 1,
    PageSize: 10,
}

export interface ODich {
    oDichId?: number | null;
    tinhId: number | null;
    tinh?: any;
    huyenId: number | null;
    huyen?: any;
    xaId: number | null;
    xa?: any;
    benhTruyenNhiemId: number | null;
    trangThai: number | null;
    trangThaiObject: any;
    tenODich: string | null;
    truongHopBenhId: number | null;
    xacDinhThbDauTien: number | null;
    yeuToDichTe: string | null;
    moTaTomTat: string | null;
    ngayNhanBaoCao: string | null;
    ngayKhoiPhatThbDauTien: string | null;
    ngayKhoiPhatThbCuoiCung: string | null;
    chumCaBenh: string | null;
    danhSachTruongHopBenh: string | null;
    soMacTong: number | null;
    soMacXn: number | null;
    soMacDuongTinh: number | null;
    soChetTong: number | null;
    soChetXn: number | null;
    soChetDuongTinh: number | null;
    nhanXet: string | null;
    hoatDongChinh: string | null;
    cacYeuToNguyCo: string | null;
    vatTuKinhPhi: string | null;
    thuanLoiKhoKhan: string | null;
    nhanXetVaBaiHoc: string | null;
    yKienDeNghi: string | null;
}
export interface SoCaMac {
    oDichSoCaMacId: number | null;
    tinhId: number | null;
    huyenId: number | null;
    xaId: number | null;
    tenDiaPhuong: string | null;
    soMac: number | null;
    soChet: number | null;
}

export interface XetNghiem {
    oDichXetNghiemId: number | null;
    tinhId: number | null;
    huyenId: number | null;
    xaId: number | null;
    tenDiaPhuong: string | null;
    soXn: number | null;
    soDuongTinh: number | null;
}

export interface BienPhapTrienKhai {
    oDichBienPhapTrienKhaiId: number | null;
    hdPhongChongDichId: number | null;
    hdPhongChongDich: any;
    yKienDeNghi: string | null;
}

export interface TienSuDichTe {
    thoiGianBatDau: string | null;
    thoiGianKetThuc: string | null;
    tinhId: number | null;
    huyenId: number | null;
    xaId: number | null;
    diaDiem: string | null;
    diaDiemNuocNgoai: number | null;
    doiTuongTiepXucId: string | null;
}

export interface IThongTinODich {
    oDich: ODich;
    isCreateNewThb: boolean;
    truongHopBenhId: number | null;
    truongHopBenh: truongHopBenh;
    doiTuongMacBenh: doiTuongMacBenh;
    soCaMacList: SoCaMac[];
    xetNghiemList: XetNghiem[];
    bienPhapTrienKhaiList: BienPhapTrienKhai[];
    tienSuDichTeList: TienSuDichTe[];
}
