export interface ITruongHopBenh {
    hoTen: string;
    ngaySinh: string;
    tuoi?: number;
    gioiTinh: string;
    ngheNghiep: string;
    danToc: string;
    cccd?: string;
    khongKhaiThacDuocCCCD: boolean;
    dienThoai?: string;
    khongKhaiThacDuocSoDienThoai: boolean;
    noiLamViecHocTap?: string;
    diaChiHienNay: string;
    tinhTpHienNay: string;
    quanHuyenHienNay: string;
    phuongXaHienNay: string;
    diaChiThuongTru?: string;
    tinhTpThuongTru?: string;
    quanHuyenThuongTru?: string;
    phuongXaThuongTru?: string;
    tenXetNghiem: string;
    tenNguoiBaoCao: string;
    ngayNhapVienKham: string;
    layMauXetNghiemChanDoan: string;
    ngayLayMau: string;
}

export const initialTruongHopBenh: ITruongHopBenh = {
    hoTen: '',
    ngaySinh: '',
    gioiTinh: '01',
    ngheNghiep: '',
    danToc: '',
    khongKhaiThacDuocCCCD: false,
    khongKhaiThacDuocSoDienThoai: false,
    diaChiHienNay: '',
    tinhTpHienNay: '',
    quanHuyenHienNay: '',
    phuongXaHienNay: '',
    cccd: "",
    dienThoai: "",
    noiLamViecHocTap: "",
    diaChiThuongTru: "",
    tinhTpThuongTru: "",
    quanHuyenThuongTru: "",
    phuongXaThuongTru: "",
    tenXetNghiem: "",
    tenNguoiBaoCao: "",
    ngayNhapVienKham: "",
    ngayLayMau: "",
    layMauXetNghiemChanDoan: "02",
};