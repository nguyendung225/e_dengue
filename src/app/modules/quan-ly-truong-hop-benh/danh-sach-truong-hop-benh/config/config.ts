export const CURENT_STATUS = {
    DT_NGOAI_TRU: 0,
    DT_NOI_TRU: 1,
    RA_VIEN: 2,
    TU_VONG: 3,
    CHUYEN_VIEN: 4,
    TINH_TRANG_KHAC: 5,
}

export const CONFIG_BY_CURRENT_STATUS = {
    [CURENT_STATUS.DT_NGOAI_TRU]: {
        ngayKhoiPhat: {
            disabled: false,
            require: true,
        },
        ngayNhapVienKham: {
            disabled: false,
            require: true,
        },
        ngayRaVienChuyenVienTuVong: {
            disabled: true,
            require: false,
        }
    },
    [CURENT_STATUS.DT_NOI_TRU]: {
        ngayKhoiPhat: {
            disabled: false,
            require: true,
        },
        ngayNhapVienKham: {
            disabled: false,
            require: true,
        },
        ngayRaVienChuyenVienTuVong: {
            disabled: true,
            require: false,
        }
    },
    [CURENT_STATUS.RA_VIEN]: {
        ngayKhoiPhat: {
            disabled: false,
            require: true,
        },
        ngayNhapVienKham: {
            disabled: false,
            require: true,
        },
        ngayRaVienChuyenVienTuVong: {
            disabled: false,
            require: false,

        },
        chanDoanRaVien: {
            disabled: false,
            require: true,
        }
    },
    [CURENT_STATUS.TU_VONG]: {
        ngayKhoiPhat: {
            disabled: false,
            require: true,
        },
        ngayNhapVienKham: {
            disabled: false,
            require: true,
        },
        ngayRaVienChuyenVienTuVong: {
            disabled: false,
            require: true,
        }
    },
    [CURENT_STATUS.CHUYEN_VIEN]: {
        ngayKhoiPhat: {
            disabled: false,
            require: true,
        },
        ngayNhapVienKham: {
            disabled: false,
            require: true,
        },
        ngayRaVienChuyenVienTuVong: {
            disabled: false,
            require: true,
        },
        chuyenToi: {
            disabled: false,
            require: true,
        }
    },
    [CURENT_STATUS.TINH_TRANG_KHAC]: {
        ngayKhoiPhat: {
            disabled: false,
            require: false,
        },
        ngayNhapVienKham: {
            disabled: false,
            require: true,
        },
        ngayRaVienChuyenVienTuVong: {
            disabled: true,
            require: false,
        },
        tinhTrangKhac: {
            disabled: false,
            require: true,
        },
    },
}

export const TYPE_TEST_CODE = {
    LOAI_TEST_NHANH: 0,
    LOAI_MAC_ELISA: 1,
    LOAI_PCR: 2,
    LOAI_KHAC: 3,
}

export const CONFIG_BY_TYPE_TEST = {
    [TYPE_TEST_CODE.LOAI_PCR]: {
        dinhLoai: {
            require: false
        }
    },
    [TYPE_TEST_CODE.LOAI_KHAC]: {
        tenXetNghiemKhac: {
            require: true
        },
        dinhLoai: {
            require: false
        }
    },
}