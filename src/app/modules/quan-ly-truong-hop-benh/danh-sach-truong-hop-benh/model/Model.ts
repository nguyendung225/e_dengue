export interface truongHopBenh {
    benhTruyenNhiemId: number | null;
    truongHopBenhId: number | null;
    doiTuongMacBenhId: number | null;
    capDoBenhId: number | null;
    tinhTrangHienNay: number | null;
    ngayKhoiPhat: string | null;
    ngayNhapVien: string | null;
    ngayRaVien: string | null;
    chanDoanRaVien: string | null;
    benhVienChuyenToiId: number | null;
    benhVienChuyenToi?: any 
    tinhTrangKhac: string | null;
    phanLoaiChanDoan: number | null;
    layMauXetNghiem: number | null;
    suDungVacXin: number | null;
    soLanSuDung: number | null;
    loaiXetNghiem: number | null;
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
    trangThaiPhanHoi: number | null;
    trangThaiTheoDoi: number | null;
    capDoBenhRaVienId: string | null;
    capDoBenhRaVienTen?: string | null;
    ngayTao?: string | null;
    //object
    capDoBenhRaVien?: any
    noiPhatHien: string | null;
    donViCongTacNbc?: any 
    coSoDieuTri?: any 
    coSoQuanLy?: any 
    donViXetNghiemObject?: any 
    capDoBenh?: any 
    capDoBenhTen?: string | null;
    benhVienChuyenToiTen?: string | null;
    donViXetNghiemTen?: string | null;
    donViCongTacNbcTen?: string | null;
    coSoDieuTriTen?: string | null;
    coSoQuanLyTen?: string | null;
    kinhDo?: string | null;
    viDo?: string | null;
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
    ngheNghiep?: any 
    danToc?: any 
    tinhHienNay?: any 
    huyenHienNay?: any 
    xaHienNay?: any 
    tinhThuongTru?: any 
    huyenThuongTru?: any 
    xaThuongTru?: any 
    ngheNghiepTen?: string | null;
    danTocTen?: string | null;
    tinhTenHienNay?: string | null;
    huyenTenHienNay?: string | null;
    xaTenHienNay?: string | null;
    tinhTenThuongTru?: string | null;
    huyenTenThuongTru?: string | null;
    xaTenThuongTru?: string | null;
}

////////////////////////////////////////////////////////

export interface TruongHopBenh {
    truongHopBenh: truongHopBenh
    doiTuongMacBenh: doiTuongMacBenh
}

export interface IDropdownButton {
    title: string;
    handleClick: () => void;
}