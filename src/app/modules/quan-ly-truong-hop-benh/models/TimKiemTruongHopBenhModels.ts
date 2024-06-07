
export interface SearchObjectModel {
    keyword?: string;
    thoiGianBatDau?: string | null;
    thoiGianKetThuc?: string | null;
    benhIds?: number[] | null;
    listTrangThai?: number[] | null;
    tinhId?: number | any | null;
    huyenId?: number | any | null;
    xaId?: number | any | null;
    hoTen?: string;
    gioiTinh?: number | any | null;
    ngheNghiepId?: number | any | null;
    tuNgayKhoiPhat?: string | null;
    denNgayKhoiPhat?: string | null;
    tuNgayNhapVien?: string | null;
    denNgayNhapVien?: string | null;
    tuNgayRaVien?: string | null;
    denNgayRaVien?: string | null;
    kqXetNghiem?: number | any | null;
    tuNgayLayMau?: string | null;
    denNgayLayMau?: string | null;
    donViThucHienXn?: number | any | null;
    tuNgayTraKetQuaXn?: string | null;
    denNgayTraKetQuaXn?: string | null;
    coSoDieuTriId?: number| any | null;
    isNopTroLen?: boolean | null;
    pageNumber: number;
    pageSize: number;
    phanLoaiQuanLy?: number | any | null;
    tuNgayNhapBaoCao?: string | null;
    denNgayNhapBaoCao?: string | null;
    listTinhTrangHienNay?: number[] | null;
    coSoGhiNhanId?: number | any | null;
}

export interface CheckTrungParams {
    HaveCmnd?: boolean;
    Cmnd?: string;
    HoTen?: string;
    NgaySinh?: string;
    GioiTinh?: number;
    TinhId?: number;
    HuyenId?: number;
    XaId?: number;
    PageNumber?: number;
    PageSize?: number;
}

export const INIT_VALUE_CHECK_TRUNG: CheckTrungParams = {
    HaveCmnd: true,
    Cmnd: '',
    HoTen: '',
    NgaySinh: '',
    GioiTinh: 0,
    TinhId: 0,
    HuyenId: 0,
    XaId: 0,
    PageNumber: 1,
    PageSize: 10
};