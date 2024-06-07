import * as Yup from "yup";
import ThongTinHanhChinhTab from "../components/ThongTinHanhChinhTab";
import ThongTinChanDoanTab from "../components/ThongTinChanDoanTab";
import ThongTinGhiNhanTab from "../components/ThongTinGhiNhan";
import { convertGenderToString, formatDateToString } from "../../../utils/FormatUtils";
import { CURENT_STATUS, TYPE_TEST_CODE } from "../config/config";
import { OCTKTSVG } from "@oceantech/oceantech-ui";
import TienSuBenh from "../components/TienSuBenhTab";
import moment from "moment";
import LichSuTheoDoi from "../components/LichSuTheoDoi";
import LichSuXacNhan from "../components/LichSuXacNhan";
import { doiTuongMacBenh, truongHopBenh, TruongHopBenh } from "../model/Model";
import { exportToFile } from "../../../utils/FunctionUtils";
import { TYPE } from "../../../utils/Constant";
import { exportPdfFile, exportWordFile } from "../servives/Services";

const TRANG_THAI_PHAN_HOI = {
    QUA_7_NGAY_CHUA_XN: -1,
    CHUA_XAC_NHAN: 0,
    DA_XN_DUNG: 1,
    XN_SAI_THONG_TIN_HANH_CHINH: 2,
    XN_SAI_THONG_TIN_CHAN_DOAN: 3,
}

const randerTrangThaiPhanHoi = (trangThaiPhanHoi: number) => {
    switch(trangThaiPhanHoi) {
        case TRANG_THAI_PHAN_HOI.DA_XN_DUNG:
            return <OCTKTSVG path="/media/svg/icons/check-circle-fill.svg" svgClassName="spaces w-16 h-16 mr-10 color-bright-cyan"/>
        case TRANG_THAI_PHAN_HOI.QUA_7_NGAY_CHUA_XN: 
            return <OCTKTSVG path="/media/svg/icons/exclamation-triangle-fill.svg" svgClassName="spaces w-16 h-16 mr-10 color-dark-red"/>
        case TRANG_THAI_PHAN_HOI.CHUA_XAC_NHAN:
            return <OCTKTSVG path="/media/svg/icons/exclamation-triangle-fill.svg" svgClassName="spaces w-16 h-16 mr-10 color-dark-orange"/>
        case TRANG_THAI_PHAN_HOI.XN_SAI_THONG_TIN_HANH_CHINH:
            return <OCTKTSVG path="/media/svg/icons/question-circle-fill.svg" svgClassName="spaces w-16 h-16 mr-10 color-steel-blue"/>
        case TRANG_THAI_PHAN_HOI.XN_SAI_THONG_TIN_CHAN_DOAN: 
            return <OCTKTSVG path="/media/svg/icons/question-circle-fill.svg" svgClassName="spaces w-16 h-16 mr-10 color-green"/>
    }
}

export const danhSachThbColumns = [
  {
    name: "#",
    field: "",
    render: (row: any, index: number, stt: number) => <span>{stt}</span>
  },
  {
    name: "Họ và tên",
    field: "hoTen",
    headerStyle: {
      minWidth: "140px"
    },
    cellStyle: {
      textAlign: "left",
    },
  },
  {
    name: "GT",
    field: "gioiTinh",
    headerStyle: {
      minWidth: "60px"
    },
    render: (row: any) => (
      <span>{convertGenderToString(row?.gioiTinh)}</span>
    )
  },
  {
    name: "Ngày trả KQXN",
    field: "ngayTraKetQuaXn",
    headerStyle: {
      minWidth: "120px"
    },
    render: (row: any) => (
      <span>{formatDateToString(row?.ngayTraKetQuaXn)}</span>
    )
  },
  {
    name: "Trạng thái",
    field: "",
    headerStyle: {
      minWidth: "100px"
    },
    render: (row: any) => (
        <>{randerTrangThaiPhanHoi(row?.trangThaiPhanHoi)}</>
    )
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

export const SU_DUNG_VAXIN = [
    { code: 0, name: 'Có tiêm, uống' },
    { code: 1, name: 'Không' },
    { code: 2, name: 'Không rõ' },
]

export const LAY_MAU_XN = YES_NO_OPT[0].code;
export const KHONG_LAY_MAU_XN = YES_NO_OPT[1].code;
export const CO_SU_DUNG_VAXIN = SU_DUNG_VAXIN[0]?.code


export const KeyTab = {
    TT_HANH_CHINH: "0",
    TT_CHAN_DOAN: "1",
    TT_GHI_NHAN: "2",
};

export const hanhChinhSchema = Yup.object().shape({
    doiTuongMacBenh: Yup.object().shape({
        hoTen: Yup.string().required("Bắt buộc nhập").nullable(),
        ngaySinh: Yup.string().nullable().required("Bắt buộc nhập"),
        danToc: Yup.object().nullable().required("Bắt buộc nhập"),
        ngheNghiep: Yup.object().nullable().required("Bắt buộc nhập"),
        tinhHienNay: Yup.object().nullable().required("Bắt buộc nhập"),
        huyenHienNay: Yup.object().nullable().required("Bắt buộc nhập"),
        xaHienNay: Yup.object().nullable().required("Bắt buộc nhập"),
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
        donViXetNghiemObject: Yup.object().when("layMauXetNghiem", {
            is: LAY_MAU_XN,
            then: Yup.object().nullable().required("Bắt buộc nhập"),
            otherwise: Yup.object().nullable().notRequired()
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
        benhVienChuyenToi: Yup.object().when("tinhTrangHienNay", {
            is: `${CURENT_STATUS.CHUYEN_VIEN}`,
            then: Yup.object().nullable().required("Bắt buộc nhập"),
            otherwise: Yup.object().nullable().notRequired()

        }),
        chanDoanRaVien: Yup.string().when("tinhTrangHienNay", {
            is: `${CURENT_STATUS.RA_VIEN}`,
            then: Yup.string().nullable().required("Bắt buộc nhập"),
            otherwise: Yup.string().nullable().notRequired()

        }),
        soLanSuDung: Yup.string().when("suDungVacXin", {
            is: CO_SU_DUNG_VAXIN,
            then: Yup.string().nullable().required("Bắt buộc nhập"),
            otherwise: Yup.string().nullable().notRequired()

        })

    })
});

export const ghiNhanSchema = chanDoanSchema.shape({
    truongHopBenh: Yup.object().shape({
        ...(hanhChinhSchema.fields.truongHopBenh as Yup.ObjectSchema<any>)?.fields,
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
export const tabThongTinTruongHopBenh = [
    {
        eventKey: "0",
        title: "Thông tin hành chính",
        component: <ThongTinHanhChinhTab onlyView />
    },
    {
        eventKey: "1",
        title: "Thông tin chẩn đoán",
        component: <ThongTinChanDoanTab onlyView />
    },
    {
        eventKey: "2",
        title: "Thông tin ghi nhận",
        component: <ThongTinGhiNhanTab onlyView />
    },
    {
        eventKey: "3",
        title: "Tiền sử bệnh",
        component: <TienSuBenh />
    },
    {
        eventKey: "4",
        title: "Lịch sử theo dõi",
        component: <LichSuTheoDoi />
    },
    {
        eventKey: "5",
        title: "Lịch sử xác nhận",
        component: <LichSuXacNhan />
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

export const TINH_TRANG_HIEN_NAY = [
    {
        code: 0,
        name: "Điều trị ngoại trú",
    },
    {
        code: 1,
        name: "Điều trị nội trú",
    },
    {
        code: 2,
        name: "Ra viện",
    },
    {
        code: 3,
        name: "Tử vong",
    },
    {
        code: 4,
        name: "Chuyên viện",
    },
    {
        code: 5,
        name: "Tình trạng khác",
    },
]

export const TienSuBenhColumns = [
    {
        name: "#",
        field: "",
        render: (row: any, index: number, stt: number) => <span>{stt}</span>
    },
    {
        name: "Ngày cập nhật",
        field: "ngayCapNhat",
        headerStyle: {
            minWidth: "120px"
        },
        cellStyle: {
            textAlign: "center",
        },
        render: (row: any, index: number, stt: number) => <span>{moment(row?.ngayCapNhat).format("DD/MM/YYYY")}</span>
    },
    {
        name: "Tên bệnh",
        field: "tenBenh",
        headerStyle: {
            minWidth: "60px"
        },
    },
    {
        name: "Cơ sở điều trị",
        field: "coSoDieuTri",
        headerStyle: {
            minWidth: "140px"
        },
        cellStyle: {
            minWidth: "200px",
            textAlign: "left",
        },
    },
    {
        name: "Tình trạng",
        field: "tinhTrang",
        headerStyle: {
            minWidth: "120px"
        },
    },
]
export const LichSuXacNhanColumns = [
    {
        name: "#",
        field: "",
        render: (row: any, index: number, stt: number) => <span>{stt}</span>
    },
    {
        name: "Ngày cập nhật",
        field: "ngayCapNhat",
        headerStyle: {
            minWidth: "120px"
        },
        cellStyle: {
            textAlign: "center",
        },
        render: (row: any, index: number, stt: number) => <span>{moment(row?.ngayCapNhat).format("DD/MM/YYYY")}</span>
    },
    {
        name: "Trạng thái",
        field: "trangThai",
        headerStyle: {
            minWidth: "120px"
        },
    },
    {
        name: "Mô tả",
        field: "moTa",
        headerStyle: {
            minWidth: "120px"
        },
        cellStyle: {
            minWidth: "200px",
            textAlign: "left",
        },
    },
    {
        name: "Cơ sở xác nhận",
        field: "tenCoSoXacNhan",
        headerStyle: {
            minWidth: "150px"
        },
    },
    {
        name: "Người xác nhận",
        field: "tenNbc",
        headerStyle: {
            minWidth: "120px"
        },
    },
    {
        name: "Email",
        field: "emailNbc",
        headerStyle: {
            minWidth: "120px"
        },
    },
]


export const LichSuTheoDoiColumns = [
    {
        name: "#",
        field: "",
        render: (row: any, index: number, stt: number) => <span>{stt}</span>
    },
    {
        name: "Ngày cập nhật",
        field: "ngayCapNhat",
        headerStyle: {
            minWidth: "120px"
        },
        cellStyle: {
            textAlign: "center",
        },
        render: (row: any, index: number, stt: number) => <span>{moment(row?.ngayCapNhat).format("DD/MM/YYYY")}</span>
    },
    {
        name: "Cơ sở cập nhật",
        field: "coSoCapNhat",
        headerStyle: {
            minWidth: "150px"
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
        name: "Tình trạng",
        field: "tinhTrang",
        headerStyle: {
            minWidth: "120px"
        },
    },
    {
        name: "Họ tên NBC",
        field: "hoTenNbc",
        headerStyle: {
            minWidth: "120px"
        },
    },
    {
        name: "Điện thoại NBC",
        field: "dienThoaiNbc",
        headerStyle: {
            minWidth: "120px"
        },
    },
    {
        name: "Email",
        field: "emailNbc",
        headerStyle: {
            minWidth: "120px"
        },
    },
]

export const getExportedFileList = (thongTinTHB: TruongHopBenh, setPageLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    const exportedFileList = [
        {
            title: "Báo cáo thb.docx",
            handleClick: () => exportToFile({
                exportAPI: () => thongTinTHB?.truongHopBenh?.truongHopBenhId && exportWordFile(thongTinTHB?.truongHopBenh?.truongHopBenhId), 
                fileName: "Báo cáo thb",
                type: TYPE.WORD,
                setPageLoading
            }),
        },
        {
            title: "Báo cáo thb.pdf",
            handleClick: () => exportToFile({
                exportAPI: () => thongTinTHB?.truongHopBenh?.truongHopBenhId && exportPdfFile(thongTinTHB?.truongHopBenh?.truongHopBenhId), 
                fileName: "Báo cáo thb",
                type: TYPE.PDF,
                setPageLoading
            }),
        },
    
    ]

    return exportedFileList
    
}

export const INITIAL_TRUONG_HOP_BENH: truongHopBenh = {
    benhTruyenNhiemId: 37,
    truongHopBenhId: null,
    doiTuongMacBenhId: null,
    capDoBenhId: null,
    tinhTrangHienNay: 0,
    ngayKhoiPhat: null,
    ngayNhapVien: null,
    ngayRaVien: null,
    chanDoanRaVien: null,
    benhVienChuyenToiId: null,
    tinhTrangKhac: null,
    phanLoaiChanDoan: 0,
    layMauXetNghiem: 1,
    suDungVacXin: 1,
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
    coSoDieuTri: null,
    coSoQuanLy: null,
    donViCongTacNbc: null,
    benhVienChuyenToi: null,
    donViXetNghiemObject: null,
    capDoBenh: null
};

export const INITIAL_DOI_TUONG_MAC_BENH: doiTuongMacBenh = {
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

export const INIT_TRUONG_HOP_BENH: TruongHopBenh = {
    truongHopBenh: INITIAL_TRUONG_HOP_BENH,
    doiTuongMacBenh: INITIAL_DOI_TUONG_MAC_BENH
};

export interface BenhReport {
    truongHopBenhId: number | null;
    hoTenNguoiBaoCao: string | null;
    trangThaiXacNhanThb: number | null;
    dienThoaiNguoiBaoCao: string | null;
    moTa: string | null;
}

export const INITIAL_BENH_REPORT: BenhReport = {
    truongHopBenhId: null,
    hoTenNguoiBaoCao: null,
    trangThaiXacNhanThb: null,
    dienThoaiNguoiBaoCao: null,
    moTa: null
};
