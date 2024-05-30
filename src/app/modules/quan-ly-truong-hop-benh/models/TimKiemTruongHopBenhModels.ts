
export interface SearchObject {
    Keyword?: string;
    ThoiGianBatDau?: string | null;
    ThoiGianKetThuc?: string | null;
    BenhIds?: number[] | null;
    ListTrangThai?: number[] | null;
    TinhId?: number | null;
    HuyenId?: number | null;
    XaId?: number | null;
    HoTen?: string;
    GioiTinh?: number | null;
    NgheNghiepId?: number | null;
    TuNgayKhoiPhat?: string | null;
    DenNgayKhoiPhat?: string | null;
    TuNgayNhapVien?: string | null;
    DenNgayNhapVien?: string | null;
    TuNgayRaVien?: string | null;
    DenNgayRaVien?: string | null;
    KqXetNghiem?: number | null;
    TuNgayLayMau?: string | null;
    DenNgayLayMau?: string | null;
    DonViThucHienXn?: number | null;
    TuNgayTraKetQuaXn?: string | null;
    DenNgayTraKetQuaXn?: string | null;
    CoSoDieuTriId?: number | null;
    IsNopTroLen?: boolean | null;
    pageNumber: number;
    pageSize: number;
    PhanLoai?: number | null;
    TinhTrangHienNay?: number | null;
    NgayNhapBaoCaoTu?: string | null;
    NgayNhapBaoCaoDen?: string | null;
    coSoCreateId?: number | null;
}