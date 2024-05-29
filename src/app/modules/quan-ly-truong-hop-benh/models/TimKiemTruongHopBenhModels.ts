
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
    phanLoai?: number | any | null;
    tuNgayNhapBaoCao?: string | null;
    denNgayNhapBaoCao?: string | null;
    listTinhTrangHienNay?: number[] | any | null;
    coSoCreateId?: number | any | null;
}