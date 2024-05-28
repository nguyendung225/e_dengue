import * as Yup from "yup";
import ThongTinHanhChinhTab from "../components/ThongTinHanhChinhTab";
import ThongTinChanDoanTab from "../components/ThongTinChanDoanTab";
import ThongTinGhiNhanTab from "../components/ThongTinGhiNhan";
import { CURENT_STATUS, TYPE_TEST_CODE } from "../config/config";

export const danhSachThbColumns = [
  {
    name: "#",
    field: "",
    render: (row: any, index: number, stt: number) => <span>{stt}</span>
  },
  {
    name: "Họ và tên",
    field: "hoVaTen",
    headerStyle: {
      minWidth: "120px"
    },
    cellStyle: {
      textAlign: "center",
    },
  },
  {
    name: "GT",
    field: "gioiTinh",
    headerStyle: {
      minWidth: "60px"
    },
  },
  {
    name: "Tên bệnh",
    field: "tenBenh",
    headerStyle: {
      minWidth: "140px"
    },
    cellStyle: {
      minWidth: "200px",
      textAlign: "left",
    },
  },
  {
    name: "Ngày trả KQXN",
    field: "ngayTraKQXN",
    headerStyle: {
      minWidth: "120px"
    },
  },
  {
    name: "Trạng thái",
    field: "birthDate",
    headerStyle: {
      minWidth: "100px"
    },
  }
]

export const ThongTinThbTab = [
  {
    eventKey: "0",
    title: "Thông tin hành chính",
    component: "Thông tin hành chính"
  },
  {
    eventKey: "1",
    title: "Thông tin chẩn đoán",
    component: "Thông tin chẩn đoán"
  },
  {
    eventKey: "2",
    title: "Thông tin ghi nhận",
    component: "Thông tin ghi nhân"
  }
]

export const GENDER_OPT = [
    {
        code: 0,
        name: "Nam",
    },

    {
        code: 1,
        name: "Nữ",
    },
]

export const YES_NO_OPT = [
    {
        code: 0,
        name: "Có",
    },
    {
        code: 1,
        name: "Không",
    },
]

export const LAY_MAU_XN = YES_NO_OPT[0].code;
export const KHONG_LAY_MAU_XN = YES_NO_OPT[1].code;

export const KeyTab = {
    TT_HANH_CHINH: "0",
    TT_CHAN_DOAN: "1",
    TT_GHI_NHAN: "2",
};

export const hanhChinhSchema = Yup.object().shape({
    doiTuongMacBenh: Yup.object().shape({
        hoTen: Yup.string().required("Bắt buộc nhập").nullable(),
        ngaySinh: Yup.string().nullable().required("Bắt buộc nhập"),
        danTocId: Yup.number().nullable().required("Bắt buộc nhập"),
        ngheNghiepId: Yup.number().nullable().required("Bắt buộc nhập"),
        tinhIdHienNay: Yup.number().nullable().required("Bắt buộc nhập"),
        huyenIdHienNay: Yup.number().nullable().required("Bắt buộc nhập"),
        xaIdHienNay: Yup.number().nullable().required("Bắt buộc nhập"),
        cmnd: Yup.string().when("haveCmnd", {
            is: true,
            then: Yup.string().nullable().required("Bắt buộc nhập"),
            otherwise: Yup.string().nullable().notRequired()
        }),
        dienThoai: Yup.string().when("haveDienThoai", {
            is: true,
            then: Yup.string().nullable().required("Bắt buộc nhập"),
            otherwise: Yup.string().nullable().notRequired()
        }),
        diaChiHienNay: Yup.string().nullable().required("Bắt buộc nhập"),
    })
});

export const chanDoanSchema = hanhChinhSchema.shape({
    truongHopBenh: Yup.object().shape({
        tinhTrangHienNay: Yup.string().required("Bắt buộc nhập").nullable(),
        ngayNhapVien: Yup.string().required("Bắt buộc nhập").nullable(),
        phanLoaiChanDoan: Yup.string().required("Bắt buộc nhập").nullable(),
        ngayThucHienXn: Yup.string().when("layMauXetNghiem", {
            is: LAY_MAU_XN,
            then: Yup.string().nullable().required("Bắt buộc nhập"),
            otherwise: Yup.string().nullable().notRequired()
        }),
        donViXetNghiem: Yup.string().when("layMauXetNghiem", {
            is: LAY_MAU_XN,
            then: Yup.string().nullable().required("Bắt buộc nhập"),
            otherwise: Yup.string().nullable().notRequired()
        }),
        loaiXetNghiemKhac: Yup.string().when("loaiXetNghiem", {
            is: TYPE_TEST_CODE.LOAI_KHAC,
            then: Yup.string().nullable().required("Bắt buộc nhập"),
            otherwise: Yup.string().nullable().notRequired()

        }),
        tinhTrangKhac: Yup.string().when("tinhTrangHienNay", {
            is: `${CURENT_STATUS.TINH_TRANG_KHAC}`,
            then: Yup.string().nullable().required("Bắt buộc nhập"),
            otherwise: Yup.string().nullable().notRequired()

        }),
        benhVienChuyenToiId: Yup.string().when("tinhTrangHienNay", {
            is: `${CURENT_STATUS.CHUYEN_VIEN}`,
            then: Yup.string().nullable().required("Bắt buộc nhập"),
            otherwise: Yup.string().nullable().notRequired()

        }),
        chanDoanRaVien: Yup.string().when("tinhTrangHienNay", {
            is: `${CURENT_STATUS.RA_VIEN}`,
            then: Yup.string().nullable().required("Bắt buộc nhập"),
            otherwise: Yup.string().nullable().notRequired()

        })

    })
});

export const ghiNhanSchema = chanDoanSchema.shape({
    truongHopBenh: chanDoanSchema.fields.truongHopBenh.shape({
        tenNguoiBaoCao: Yup.string().required("Bắt buộc nhập").nullable(),
        dienThoaiNguoiBaoCao: Yup.string().required("Bắt buộc nhập").nullable(),
        emailNguoiBaoCao: Yup.string().required("Bắt buộc nhập").nullable(),
        donViCongTacNbc: Yup.object().required("Bắt buộc nhập").nullable(),
        coSoDieuTri: Yup.object().required("Bắt buộc nhập").nullable(),
        coSoQuanLy: Yup.object().required("Bắt buộc nhập").nullable(),
        noiPhatHien: Yup.string().required("Bắt buộc nhập").nullable(),

    })
})

export const tabConfig = {
    [KeyTab.TT_HANH_CHINH]: { schema: hanhChinhSchema, prevTab: null, nextTab: KeyTab.TT_CHAN_DOAN },
    [KeyTab.TT_CHAN_DOAN]: { schema: chanDoanSchema, prevTab: KeyTab.TT_HANH_CHINH, nextTab: KeyTab.TT_GHI_NHAN },
    [KeyTab.TT_GHI_NHAN]: { schema: ghiNhanSchema, prevTab: KeyTab.TT_CHAN_DOAN, nextTab: null }
};

export const tabTruongHopBenh = [
    {
        eventKey: KeyTab.TT_HANH_CHINH,
        title: "Thông tin hành chính",
        component: <ThongTinHanhChinhTab />
    },
    {
        eventKey: KeyTab.TT_CHAN_DOAN,
        title: "Thông tin chẩn đoán",
        component: <ThongTinChanDoanTab />
    },
    {
        eventKey: KeyTab.TT_GHI_NHAN,
        title: "Thông tin ghi nhận",
        component: <ThongTinGhiNhanTab />
    },
];

export const PHAN_LOAI_CHAN_DOAN = [
    { code: 0, name: 'Nghi Ngờ' },
    { code: 1, name: 'Xác Định Phòng Xét Nghiệm' },
    { code: 2, name: 'Có Thể' }
];

export const PCLD_XAC_DINH_PHONG_XET_NGHIEM = PHAN_LOAI_CHAN_DOAN[1]?.code

export const LOAI_XET_NGHIEM = [
    { code: 0, name: 'Loại Test Nhanh' },
    { code: 1, name: 'Loại Mac-Elisa' },
    { code: 2, name: 'Loại PCR' },
    { code: 3, name: 'Loại Khác' },
];

export const KQ_XET_NGHIEM = [
    { code: 0, name: 'Dương Tính' },
    { code: 1, name: 'Âm Tính' },
    { code: 2, name: 'Chưa Có Kết Quả' },
    { code: 3, name: 'Không Thực Hiện' }
];

export const SU_DUNG_VAXIN = [
    { code: 0, name: 'Có tiêm, uống' },
    { code: 1, name: 'Không' },
    { code: 2, name: 'Không rõ' },
]

export const DIA_DIEM_DIEU_TRI = [
    { code: 0, name: 'Trạm y tế' },
    { code: 1, name: 'Tại nhà' },
    { code: 2, name: 'Y tế cơ quan' },
    { code: 3, name: 'Khác' },
]

export const columnsDSCoSo = [
    {
        name: "Mã",
        field: "ma",
    },
    {
        name: "Tên cơ sở",
        field: "ten",
    },
    {
        name: "Địa chỉ",
        field: "diaChi",
    },
]