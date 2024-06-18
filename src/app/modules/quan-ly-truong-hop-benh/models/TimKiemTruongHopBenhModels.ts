import { AnyCnameRecord } from "dns";

interface ITinh {
    id: number;
    tenTinh: string;
}

interface IHuyen {
    id: number;
    tenHuyen: string;
}

interface IXa {
    xaId: number;
    tenXa: string;
}

interface ICoSoDieuTri {
    id: number;
    tenCoSo: string;
}

interface ICoSoGhiNhan {
    id: number;
    tenCoSo: string;
}

interface IDonViThucHienXn {
    id: number;
    tenCoSo: string;
}

interface IPhanLoaiQuanLy {
    code: number,
    name: string
}

export interface ISearchObjectModel {
    keyword?: string | null;
    thoiGianBatDau?: string | null;
    thoiGianKetThuc?: string | null;
    benhIds?: number[] | null;
    listTrangThai?: number[] | null;
    tinh?: ITinh | null;
    huyen?: IHuyen | null;
    xa?: IXa | null;
    hoTen?: string | null;
    gioiTinh?: number | null;
    ngheNghiep?: any;
    tuNgayKhoiPhat?: string | null;
    denNgayKhoiPhat?: string | null;
    tuNgayNhapVien?: string | null;
    denNgayNhapVien?: string | null;
    tuNgayRaVien?: string | null;
    denNgayRaVien?: string | null;
    kqXetNghiem?: number | null;
    tuNgayLayMau?: string | null;
    denNgayLayMau?: string | null;
    donViThucHienXn?: IDonViThucHienXn | null;
    tuNgayTraKetQuaXn?: string | null;
    denNgayTraKetQuaXn?: string | null;
    coSoDieuTri?: ICoSoDieuTri | null;
    isNopTroLen?: boolean | null;
    pageNumber: number;
    pageSize: number;
    phanLoaiQuanLy?: IPhanLoaiQuanLy | null;
    tuNgayNhapBaoCao?: string | null;
    denNgayNhapBaoCao?: string | null;
    listTinhTrangHienNay?: number[] | null;
    coSoGhiNhan?: ICoSoGhiNhan | null;
}

export interface CheckTrungParams {
    HaveCmnd?: boolean;
    Cmnd?: string;
    HoTen?: string;
    NgaySinh?: string;
    GioiTinh?: number;
    TinhId?: number | null;
    HuyenId?: number | null;
    XaId?: number | null;
    PageNumber?: number;
    PageSize?: number;
}

export const INIT_VALUE_CHECK_TRUNG: CheckTrungParams = {
    HaveCmnd: true,
    Cmnd: '',
    HoTen: '',
    NgaySinh: '',
    GioiTinh: 0,
    TinhId: null,
    HuyenId: null,
    XaId: null,
    PageNumber: 1,
    PageSize: 10
};