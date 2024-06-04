export interface truongHopBenh {
    benhTruyenNhiemId: number | null;
    truongHopBenhId: number | null;
    doiTuongMacBenhId: number | null;
    capDoBenhId: number | null;
    tinhTrangHienNay: string | null;
    ngayKhoiPhat: string | null;
    ngayNhapVien: string | null;
    ngayRaVien: string | null;
    chanDoanRaVien: string | null;
    benhVienChuyenToiId: number | null;
    benhVienChuyenToi: any | null;
    tinhTrangKhac: string | null;
    phanLoaiChanDoan: number | null;
    layMauXetNghiem: number | null;
    suDungVacXin: number | null;
    soLanSuDung: number | null;
    loaiXetNghiem: string | null;
    loaiXetNghiemKhac: string | null;
    dinhLoaiXetNghiemKhac: string | null;
    ketQuaXetNghiem: string | null;
    ngayThucHienXn: string | null;
    ngayTraKetQuaXn: string | null;
    donViXetNghiem: number | null;
    benhChanDoanPhu: string | null;
    chanDoanBienChung: string | null;
    tienSuDichTe: string | null;
    ghiChu: string | null;
    tenNguoiBaoCao: string | null;
    emailNguoiBaoCao: string | null;
    donViCongTacNbcId: number | null;
    dienThoaiNguoiBaoCao: string | null;
    coSoDieuTriId: number | null;
    coSoQuanLyId: number | null;
    trangThaiPhanHoi: string | null; // không rõ
    trangThaiTheoDoi: number | null;
    //object
    noiPhatHien: string | null;
    donViCongTacNbc: any | null;
    coSoDieuTri: any | null;
    coSoQuanLy: any | null;
    donViXetNghiemObject: any | null;
    capDoBenh: any | null;
}

export interface doiTuongMacBenh {
    doiTuongMacBenhId: number | null;
    maSo?: string | null;
    hoTen: string | null;
    ngaySinh: string | null;
    ngheNghiepId: number | null;
    danTocId: number | null;
    gioiTinh: number | null;
    haveCmnd: boolean;
    cmnd: string | null;
    haveDienThoai: boolean;
    dienThoai: string | null;
    noiLamViecHocTap: string | null;
    tinhIdHienNay: number | null;
    huyenIdHienNay: number | null;
    xaIdHienNay: number | null;
    diaChiHienNay: string | null;
    tinhIdThuongTru: number | null;
    huyenIdThuongTru: number | null;
    xaIdThuongTru: number | null;
    diaChiThuongTru: string | null;
    ////object
    ngheNghiep: any | null;
    danToc: any | null;
    tinhHienNay: any | null;
    huyenHienNay: any | null;
    xaHienNay: any | null;
    tinhThuongTru: any | null;
    huyenThuongTru: any | null;
    xaThuongTru: any | null;
}

////////////////////////////////////////////////////////

export interface TruongHopBenh {
    truongHopBenh: truongHopBenh
    doiTuongMacBenh: doiTuongMacBenh
}

const initialtruongHopBenh: truongHopBenh = {
    benhTruyenNhiemId: 37,
    truongHopBenhId: null,
    doiTuongMacBenhId: null,
    capDoBenhId: null,
    tinhTrangHienNay: null,
    ngayKhoiPhat: null,
    ngayNhapVien: null,
    ngayRaVien: null,
    chanDoanRaVien: null,
    benhVienChuyenToiId: null,
    tinhTrangKhac: null,
    phanLoaiChanDoan: null,
    layMauXetNghiem: 1,
    suDungVacXin: null,
    soLanSuDung: null,
    loaiXetNghiem: null,
    loaiXetNghiemKhac: "",
    dinhLoaiXetNghiemKhac: null,
    ketQuaXetNghiem: null,
    ngayThucHienXn: null,
    ngayTraKetQuaXn: null,
    donViXetNghiem: null,
    benhChanDoanPhu: null,
    chanDoanBienChung: null,
    tienSuDichTe: null,
    ghiChu: null,
    tenNguoiBaoCao: null,
    emailNguoiBaoCao: null,
    donViCongTacNbcId: null,
    dienThoaiNguoiBaoCao: null,
    noiPhatHien: null,
    coSoDieuTriId: null,
    coSoQuanLyId: null,
    trangThaiPhanHoi: null,
    trangThaiTheoDoi: null,
    ///object
    coSoDieuTri:null,
    coSoQuanLy:null,
    donViCongTacNbc:null,
    benhVienChuyenToi:null,
    donViXetNghiemObject:null,
    capDoBenh:null

};

const initialdoiTuongMacBenh: doiTuongMacBenh = {
    doiTuongMacBenhId: null,
    hoTen: null,
    ngaySinh: null,
    ngheNghiepId: null,
    danTocId: null,
    gioiTinh: 1,
    haveCmnd: true,
    cmnd: null,
    haveDienThoai: true,
    dienThoai: null,
    noiLamViecHocTap: null,
    tinhIdHienNay: null,
    huyenIdHienNay: null,
    xaIdHienNay: null,
    diaChiHienNay: null,
    tinhIdThuongTru: null,
    huyenIdThuongTru: null,
    xaIdThuongTru: null,
    diaChiThuongTru: null,
    //object
    ngheNghiep: null,
    danToc: null,
    tinhHienNay: null,
    huyenHienNay: null,
    xaHienNay: null,
    tinhThuongTru: null,
    huyenThuongTru: null,
    xaThuongTru: null
};

export const initTruongHopBenh: TruongHopBenh = {
    truongHopBenh: initialtruongHopBenh,
    doiTuongMacBenh: initialdoiTuongMacBenh
};

export interface BenhReport {
    truongHopBenhId: number | null;
    hoTenNguoiBaoCao: string | null;
    trangThaiXacNhanThb: number | null;
    dienThoaiNguoiBaoCao: string | null;
    moTa: string | null;
}

export const initialBenhReport: BenhReport = {
    truongHopBenhId: null,
    hoTenNguoiBaoCao: null,
    trangThaiXacNhanThb: null,
    dienThoaiNguoiBaoCao: null,
    moTa: null
};
