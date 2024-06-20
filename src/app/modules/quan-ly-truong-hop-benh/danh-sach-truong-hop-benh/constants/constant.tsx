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
import { regex } from "../../../constant";
import { MIN_DATE_200 } from "../../../../Constant";

export const TRANG_THAI_PHAN_HOI = {
    QUA_7_NGAY_CHUA_XN: -1,
    CHUA_XAC_NHAN: 0,
    DA_XN_DUNG: 1,
    XN_SAI_THONG_TIN_HANH_CHINH: 2,
    XN_SAI_THONG_TIN_CHAN_DOAN: 3,
}

export const XAC_NHAN_THB = [
    {
        code : TRANG_THAI_PHAN_HOI.DA_XN_DUNG,
        name : 'Xác minh đúng thông tin'
    },
    {
        code : TRANG_THAI_PHAN_HOI.XN_SAI_THONG_TIN_HANH_CHINH,
        name : 'Thông tin THB sai thông tin hành chính'
    },
    {
        code : TRANG_THAI_PHAN_HOI.XN_SAI_THONG_TIN_CHAN_DOAN,
        name : 'Thông tin THB sai thông tin chuẩn đoán'
    }
]

const isDifferenceGreaterThan7Days = (ngayTao: string): boolean => {
    const createdDate = new Date(ngayTao);
    const currentDate = new Date();

    createdDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    const differenceInMilliseconds = currentDate.getTime() - createdDate.getTime();
    const millisecondsInDay = 1000 * 60 * 60 * 24;
    const differenceInDays = Math.floor(differenceInMilliseconds / millisecondsInDay);
    
    return differenceInDays > 7;
};

const randerTrangThaiPhanHoi = (trangThaiPhanHoi: number, ngayTao: any) => {
    switch(trangThaiPhanHoi) {
        case TRANG_THAI_PHAN_HOI.DA_XN_DUNG:
            return <OCTKTSVG path="/media/svg/icons/check-circle-fill.svg" svgClassName="spaces w-16 h-16 mr-10 color-bright-cyan"/>
        case TRANG_THAI_PHAN_HOI.CHUA_XAC_NHAN:
           return isDifferenceGreaterThan7Days(ngayTao) 
            ? <OCTKTSVG path="/media/svg/icons/exclamation-circle-fill.svg" svgClassName="spaces w-16 h-16 mr-10 color-red"/> 
            : <OCTKTSVG path="/media/svg/icons/exclamation-triangle-fill.svg" svgClassName="spaces w-16 h-16 mr-10 color-dark-orange"/>
        case TRANG_THAI_PHAN_HOI.XN_SAI_THONG_TIN_HANH_CHINH:
            return <OCTKTSVG path="/media/svg/icons/question-circle-fill.svg" svgClassName="spaces w-16 h-16 mr-10 color-steel-blue"/>
        case TRANG_THAI_PHAN_HOI.XN_SAI_THONG_TIN_CHAN_DOAN: 
            return <OCTKTSVG path="/media/svg/icons/question-circle-fill.svg" svgClassName="spaces w-16 h-16 mr-10 color-green"/>
        default:
           return;
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
    render: (row: any) => row?.isQuaHanNopBaoCao ? <span className="color-red">{row?.hoTen}</span> : <span>{row?.hoTen}</span>
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
    render: (row: any) => <>{randerTrangThaiPhanHoi(row?.trangThaiPhanHoi,row?.ngayTao)}</>
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
        hoTen: Yup.string().required("Bắt buộc nhập").nullable()
            .matches(regex.name,"Họ tên không được chứa ký tự số hoặc ký tự đặc biệt")
            .max(50, "Không được quá 50 ký tự"),
        ngaySinh: Yup.date()
            .nullable()
            .min(new Date(new Date().setFullYear(MIN_DATE_200)), `Phải từ năm ${MIN_DATE_200} trở đi`)
            .max(new Date(), 'Không thể lớn hơn ngày hiện tại')
            .required("Bắt buộc nhập"),
        danToc: Yup.object().nullable().required("Bắt buộc nhập"),
        ngheNghiep: Yup.object().nullable().required("Bắt buộc nhập"),
        tinhHienNay: Yup.object().nullable().required("Bắt buộc chọn"),
        huyenHienNay: Yup.object().nullable().required("Bắt buộc chọn"),
        xaHienNay: Yup.object().nullable().required("Bắt buộc chọn"),
        cmnd: Yup.string().when("haveCmnd", {
            is: true,
            then: Yup.string().nullable().required("Bắt buộc nhập")
                .matches(regex.cccd, "Căn cước phải có 9 hoặc 12 chữ số"),
            otherwise: Yup.string().nullable().notRequired()
        }),
        dienThoai: Yup.string().when("haveDienThoai", {
            is: true,
            then: Yup.string().nullable().required("Bắt buộc nhập")
                .matches(regex.phone,"Số điện thoại không hợp lệ"),
            otherwise: Yup.string().nullable().notRequired()
        }),
        diaChiHienNay: Yup.string().nullable().required("Bắt buộc nhập")
            .matches(regex.address,"Địa chỉ không hợp lệ")
            .max(250, "Không được quá 250 ký tự"),
        diaChiThuongTru: Yup.string().nullable().required("Bắt buộc nhập")
            .matches(regex.address,"Địa chỉ không hợp lệ")
            .max(250, "Không được quá 250 ký tự"),
        tinhThuongTru: Yup.object().nullable().required("Bắt buộc chọn"),
        huyenThuongTru: Yup.object().nullable().required("Bắt buộc chọn"),
        xaThuongTru: Yup.object().nullable().required("Bắt buộc chọn")
    })
});

export const chanDoanSchema = hanhChinhSchema.shape({
    truongHopBenh: Yup.object().shape({
        ngayNhapVien: Yup.date()
        .nullable()
        .min(new Date(new Date().setFullYear(MIN_DATE_200)), `Phải từ năm ${MIN_DATE_200} trở đi`)
        .max(new Date(), 'Ngày không thể lớn hơn ngày hiện tại')
        .required("Bắt buộc nhập")
        .when("ngayRaVien", {
            is: ( ngayRaVien: string | null ) => ngayRaVien,
            then: Yup.date()
            .nullable()
            .min(new Date(new Date().setFullYear(MIN_DATE_200)), `Phải từ năm ${MIN_DATE_200} trở đi`)
            .required("Bắt buộc nhập")
            .max(new Date(), 'Ngày không thể lớn hơn ngày hiện tại')
            .max(Yup.ref("ngayRaVien"), "Ngày không thể lớn hơn ngày ra viện/chuyển viện/tử vong"),
            otherwise: Yup.date()
            .nullable()
            .min(new Date(new Date().setFullYear(MIN_DATE_200)), `Phải từ năm ${MIN_DATE_200} trở đi`)
            .max(new Date(), 'Ngày không thể lớn hơn ngày hiện tại')
            .required("Bắt buộc nhập")
        }),
        ngayRaVien: Yup.date()
            .nullable()
            .min(new Date(new Date().setFullYear(MIN_DATE_200)), `Phải từ năm ${MIN_DATE_200} trở đi`)
            .max(new Date(), 'Ngày không thể lớn hơn ngày hiện tại')
            .when("tinhTrangHienNay", {
                is: ( tinhTrangHienNay : number ) => 
                    ( +tinhTrangHienNay === CURENT_STATUS.RA_VIEN || +tinhTrangHienNay === CURENT_STATUS.CHUYEN_VIEN || +tinhTrangHienNay === CURENT_STATUS.TU_VONG ),
                then: Yup.date()
                    .nullable()
                    .max(new Date(), 'Ngày không thể lớn hơn ngày hiện tại')
                    .required("Bắt buộc nhập")
                    .min(Yup.ref("ngayNhapVien"), "Ngày không thể nhỏ hơn ngày nhập viện"),
                otherwise: Yup.date().nullable()
            }),
        ngayKhoiPhat: Yup.date()
            .nullable()
            .min(new Date(new Date().setFullYear(MIN_DATE_200)), `Phải từ năm ${MIN_DATE_200} trở đi`)
            .max(new Date(), 'Ngày không thể lớn hơn ngày hiện tại')
            .required("Bắt buộc nhập")
            .max(Yup.ref("ngayNhapVien"), "Ngày không thể lớn hơn ngày nhập viện"),
        tinhTrangHienNay: Yup.string().required("Bắt buộc nhập").nullable(),
        phanLoaiChanDoan: Yup.string().required("Bắt buộc nhập").nullable(),
        ngayThucHienXn: Yup.date().when("layMauXetNghiem", {
            is: LAY_MAU_XN,
            then: Yup.date().nullable()
            .min(new Date(new Date().setFullYear(MIN_DATE_200)), `Phải từ năm ${MIN_DATE_200} trở đi`)
            .max(new Date(), 'Ngày không thể lớn hơn ngày hiện tại')
            .required("Bắt buộc nhập"),
            otherwise: Yup.date().nullable().notRequired(),
        }),
        ngayTraKetQuaXn: Yup.date().when(["layMauXetNghiem", "ngayThucHienXn"], {
            is: ( layMauXetNghiem: number, ngayThucHienXn: string | null ) =>
                layMauXetNghiem === LAY_MAU_XN && ngayThucHienXn,
            then: Yup.date()
                .nullable()
                .min(new Date(new Date().setFullYear(MIN_DATE_200)), `Phải từ năm ${MIN_DATE_200} trở đi`)
                .max(new Date(), 'Ngày không thể lớn hơn ngày hiện tại')
                .min(Yup.ref("ngayThucHienXn"), "Ngày không thể nhỏ hơn ngày lấy mẫu"),
            otherwise: Yup.date().nullable().notRequired()
        }),
        donViXetNghiemObject: Yup.object().when("layMauXetNghiem", {
            is: LAY_MAU_XN,
            then: Yup.object().nullable()
            .required("Bắt buộc nhập"),
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
        soLanSuDung: Yup.number().when("suDungVacXin", {
            is: (suDungVacXin: number) => suDungVacXin === CO_SU_DUNG_VAXIN,
            then: Yup.number()
                .nullable()
                .required("Bắt buộc nhập")
                .min(0, "Phải là số nguyên dương"),
            otherwise: Yup.number()
                .nullable()
                .notRequired()
                .typeError("Phải là giá trị số")
        }),
    })
});

export const ghiNhanSchema = chanDoanSchema.shape({
    truongHopBenh: Yup.object().shape({
        ...(hanhChinhSchema.fields.truongHopBenh as Yup.ObjectSchema<any>)?.fields,
        tenNguoiBaoCao: Yup.string().required("Bắt buộc nhập").nullable()
            .matches(regex.name,"Tên không được chứa ký số hoặc ký tự đặc biệt")
            .max(50, "Không được quá 50 ký tự"),
        dienThoaiNguoiBaoCao: Yup.string()
            .required("Bắt buộc nhập")
            .nullable()
            .matches(regex.phone, "Số điện thoại không hợp lệ"),
        emailNguoiBaoCao: Yup.string().required("Bắt buộc nhập").nullable()
            .email("Định dạng email không hợp lệ"),
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
            title: "Xuất báo cáo theo thông tư 54 - Word",
            handleClick: () => exportToFile({
                exportAPI: () => thongTinTHB?.truongHopBenh?.truongHopBenhId && exportWordFile(thongTinTHB?.truongHopBenh?.truongHopBenhId), 
                fileName: "Báo cáo trường hợp bệnh theo thông tư 54",
                type: TYPE.WORD,
                setPageLoading
            }),
        },
        {
            title: "Xuất báo cáo theo thông tư 54 - Pdf",
            handleClick: () => exportToFile({
                exportAPI: () => thongTinTHB?.truongHopBenh?.truongHopBenhId && exportPdfFile(thongTinTHB?.truongHopBenh?.truongHopBenhId), 
                fileName: "Báo cáo trường hợp bệnh theo thông tư 54",
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
    suDungVacXin: 0,
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
    capDoBenhRaVienId: null,
    capDoBenhRaVienTen: null,
    ///object
    coSoDieuTri: null,
    capDoBenhRaVien: null,
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

export const DanhSachTHBColumns = [
    {
        name: "#",
        field: "",
        render: (row: any, index: number, stt: number) => <span>{stt}</span>
    },
    {
        name: "Họ tên",
        field: "hoTen",
        headerStyle: {
            minWidth: "120px"
        },
        cellStyle: {
            textAlign: "center",
        },
    },
    {
        name: "Ngày sinh",
        field: "ngaySinh",
        headerStyle: {
            minWidth: "120px"
        },
        cellStyle: {
            textAlign: "center",
        },
    },
]

export const CMND_CHECK_TRUNG = 'Cmnd'