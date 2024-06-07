import { OCTTextValidator } from "@oceantech/oceantech-ui";
import moment from "moment";
import * as Yup from "yup";
import Autocomplete from "../../component/input-field/Autocomplete";
import { CURENT_STATUS, TYPE_TEST_CODE } from "../../quan-ly-truong-hop-benh/danh-sach-truong-hop-benh/config/config";
import { CO_SU_DUNG_VAXIN, GENDER_OPT, INITIAL_DOI_TUONG_MAC_BENH, INITIAL_TRUONG_HOP_BENH, LAY_MAU_XN } from "../../quan-ly-truong-hop-benh/danh-sach-truong-hop-benh/constants/constant";
import { getListHoatDongChongDich } from "../../services";
import { BienPhapTrienKhai, ISearchObjModel, IThongTinODich, ODich, SoCaMac, TienSuDichTe, XetNghiem, iConfigTable } from "../models/quanLyODichModels";

const TRANG_THAI_O_DICH = [
    {
        code: 0,
        value: "Đang hoạt động"
    },
    {
        code: 1,
        value: "Đã kết thúc"
    }
]

export const dsOBenhColumns = [
    {
        name: "#",
        field: "",
        render: (row: any, index: number, stt: number) => <span>{stt}</span>
    },
    {
        name: "Địa điểm xảy ra ổ dịch",
        field: "diaDiem",
        headerStyle: {
            minWidth: "250px"
        },
        cellStyle: {
            textAlign: "left",
        },
        render: (rowData: any) => rowData?.xaTen + "," + rowData?.huyenTen + "," + rowData?.tinhTen
    },
    {
        name: "Trạng thái",
        field: "trangThai",
        headerStyle: {
            minWidth: "120px"
        },
        render: (rowData: any) => TRANG_THAI_O_DICH.find(item => item.code === rowData?.trangThai)?.value
    },
    {
        name: "Ngày khởi phát",
        field: "ngayKhoiPhat",
        cellStyle: {
            minWidth: "100px",
            textAlign: "center",
        },
        render: (rowData: any) => rowData?.ngayKhoiPhat ? moment(rowData?.ngayKhoiPhat).format("DD/MM/YYYY") : null
    },
    {
        name: "Ngày kết thúc",
        field: "ngayKetThuc",
        cellStyle: {
            minWidth: "100px",
            textAlign: "center",
        },
        render: (rowData: any) => rowData?.ngayKetThuc ? moment(rowData?.ngayKetThuc).format("DD/MM/YYYY") : null
    },
    {
        name: "Số ca mắc",
        field: "soCaMac",
        cellStyle: {
            minWidth: "100px",
            textAlign: "center",
        },
    },
    {
        name: "Số ca tử vong",
        field: "soCaTuVong",
        cellStyle: {
            minWidth: "100px",
            textAlign: "center",
        },
    },
    {
        name: "Ngày báo cáo",
        field: "ngayBaoCao",
        cellStyle: {
            minWidth: "100px",
            textAlign: "center",
        },
        render: (rowData: any) => rowData?.ngayBaoCao ? moment(rowData?.ngayBaoCao).format("DD/MM/YYYY") : null
    },
    {
        name: "Đơn vị báo cáo",
        field: "coSoBaoCaoTen",
        cellStyle: {
            minWidth: "200px",
            textAlign: "left",
        },
    },
    {
        name: "Tỉnh báo cáo",
        field: "tinhBaoCaoTen",
        cellStyle: {
            minWidth: "100px",
            textAlign: "center",
        },
    }
]

export const dsTienXuBenhNhanColumns = [
    {
        name: "Ngày cập nhật",
        field: "ngayCapNhat",
        headerStyle: {
            minWidth: "60px"
        },
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
            minWidth: "60px"
        },
    },
    {
        name: "Tình trạng",
        field: "tinhTrang",
        headerStyle: {
            minWidth: "60px"
        },
    },
]

export const dsSoMauXetNghiemColumns = ({ handleDeleteRow, handleChange, values }: any) => {
    return [
        {
            name: "#",
            field: "",
            headerStyle: {
                minWidth: "60px"
            },
            render: (row: any, index: number, stt: number) => <span>{stt}</span>
        },
        {
            name: "Địa phương",
            field: "diaPhuong",
            headerStyle: {
                minWidth: "60px"
            },
            render: (row: any, index: number, stt: number) => (
                <OCTTextValidator
                    type="text"
                    isRequired
                    name={`xetNghiemList[${index}].tenDiaPhuong`}
                    value={values?.xetNghiemList[index]?.tenDiaPhuong}
                    onChange={handleChange}
                />
            )
        },
        {
            name: "Ngày",
            field: "ngay",
            headerStyle: {
                minWidth: "60px"
            },
            render: (row: any, index: number, stt: number) => (
                <OCTTextValidator
                    type="date"
                    isRequired
                    name="truongHopBenh.loaiXetNghiemKhac"
                />
            )
        },
        {
            name: "Số mẫu làm XN",
            field: "soMauXN",
            headerStyle: {
                minWidth: "60px"
            },
            render: (row: any, index: number, stt: number) => (
                <OCTTextValidator
                    type="text"
                    isRequired
                    name={`xetNghiemList[${index}].soXn`}
                    value={values?.xetNghiemList[index]?.soXn}
                    onChange={handleChange}
                />
            )
        },
        {
            name: "Số mẫu (+)",
            field: "soMau",
            headerStyle: {
                minWidth: "60px"
            },
            render: (row: any, index: number, stt: number) => (
                <OCTTextValidator
                    type="text"
                    isRequired
                    name={`xetNghiemList[${index}].soDuongTinh`}
                    value={values?.xetNghiemList[index]?.soDuongTinh}
                    onChange={handleChange}
                />
            )
        },
        {
            name: "",
            field: "thaoTac",
            headerStyle: {
                minWidth: "60px"
            },
            render: (row: any, index: number) => {
                return (
                    index > 0 && <div onClick={() => { handleDeleteRow(index) }}>
                        <i className="bi bi-x-lg fs-3 text-danger cursor-pointer"></i>
                    </div>
                );
            }
        },
    ]
}

export const dsSoMacTuVongColumns = ({ handleDeleteRow, handleChange, values, errors, touched }: any) => {

    return [
        {
            name: "#",
            field: "",
            headerStyle: {
                minWidth: "40px"
            },
            render: (row: any, index: number, stt: number) => <span>{stt}</span>
        },
        {
            name: "Địa phương",
            field: "tenBenhNhan",
            headerStyle: {
                minWidth: "60px"
            },
            render: (row: any, index: number, stt: number) => (
                <OCTTextValidator
                    type="text"
                    isRequired
                    name={`soCaMacList[${index}].tenDiaPhuong`}
                    value={values?.soCaMacList[index]?.tenDiaPhuong}
                    onChange={handleChange}
                    errorTooltip
                    errors={errors?.soCaMacList?.[index]?.tenDiaPhuong}
                    touched={touched?.soCaMacList?.[index]?.tenDiaPhuong}
                />
            )
        },
        {
            name: "Ngày",
            field: "ngaySinh",
            headerStyle: {
                minWidth: "60px"
            },
            render: (row: any, index: number, stt: number) => (
                <OCTTextValidator
                    type="date"
                    isRequired
                    name="truongHopBenh.loaiXetNghiemKhac"
                />
            )
        },
        {
            name: "Số mắc",
            field: "tenBenhNhan",
            headerStyle: {
                width: "100px"
            },
            render: (row: any, index: number, stt: number) => (
                <OCTTextValidator
                    type="text"
                    isRequired
                    name={`soCaMacList[${index}].soMac`}
                    value={values?.soCaMacList[index]?.soMac}
                    onChange={handleChange}
                />
            )
        },
        {
            name: "Số chết",
            field: "ngaySinh",
            headerStyle: {
                width: "100px"
            },
            render: (row: any, index: number, stt: number) => (
                <OCTTextValidator
                    type="text"
                    isRequired
                    name={`soCaMacList[${index}].soChet`}
                    value={values?.soCaMacList[index]?.soChet}
                    onChange={handleChange}
                />
            )
        },
        {
            name: "",
            field: "thaoTac",
            headerStyle: {
                minWidth: "60px"
            },
            render: (row: any, index: number) => {
                return (
                    index > 0 &&
                    <i className="bi bi-x-lg fs-3 text-danger cursor-pointer"
                        onClick={() => handleDeleteRow(index)} />
                );
            }
        },
    ]
}

export const dsBienPhapPhongChongColumns = ({ handleDeleteRow, handleChange, values, setFieldValue }: any) => {

    return [
        {
            name: "#",
            field: "",
            headerStyle: {
                minWidth: "60px"
            },
            render: (row: any, index: number, stt: number) => <span>{stt}</span>
        },
        {
            name: "Hoạt động",
            field: "hoatDong",
            headerStyle: {
                minWidth: "240px",
            },
            render: (row: any, index: number) => {
                return (
                    <Autocomplete
                        searchFunction={getListHoatDongChongDich}
                        urlData='data.data'
                        getOptionLabel={(option) => option.tenHoatDong}
                        options={[]}
                        value={values.bienPhapTrienKhaiList[index]?.hdPhongChongDich}
                        onChange={(option) => {
                            setFieldValue(`bienPhapTrienKhaiList[${index}].hdPhongChongDich`, option)
                        }}
                        searchObject={{}}
                    />
                );
            }
        },
        {
            name: "Ngày",
            field: "ngay",
            headerStyle: {
                minWidth: "120px"
            },
            render: (row: any, index: number) => {
                return (
                    <OCTTextValidator
                        className="flex-row min-w-80"
                        name="ngay"
                        type="date"
                        value={row?.ngay}
                    />
                );
            }
        },
        {
            name: "Ý kiến đề nghị",
            field: "yKienDeNghi",
            headerStyle: {
                minWidth: "120px"
            },
            render: (row: any, index: number) => {
                return (
                    <OCTTextValidator
                        type="text"
                        isRequired
                        name={`bienPhapTrienKhaiList[${index}].yKienDeNghi`}
                        value={values?.bienPhapTrienKhaiList[index]?.yKienDeNghi}
                        onChange={handleChange}
                    />
                );
            }
        },
        {
            name: "",
            field: "thaoTac",
            headerStyle: {
                minWidth: "60px"
            },
            render: (row: any, index: number) => {
                return (
                    <div onClick={() => { handleDeleteRow(index) }}><i className="bi bi-x-lg fs-3 text-danger cursor-pointer"></i></div>
                );
            }
        },
    ]
}

export const dsBenhNhanColumns = [
    {
        name: "#",
        field: "",
        headerStyle: {
            minWidth: "60px"
        },
        render: (row: any, index: number, stt: number) => <span>{stt}</span>
    },
    {
        name: "Tên bệnh nhân",
        field: "tenBenhNhan",
        headerStyle: {
            minWidth: "60px"
        },
    },
    {
        name: "Ngày sinh",
        field: "ngaySinh",
        headerStyle: {
            minWidth: "60px"
        },
    },
    {
        name: "Giới tính",
        field: "gioiTinh",
        headerStyle: {
            minWidth: "60px"
        },
    },
    {
        name: "Số điện thoại",
        field: "soDienThoai",
        headerStyle: {
            minWidth: "60px"
        },
    },
    {
        name: "Ngày khởi phát",
        field: "ngayKhoiPhat",
        headerStyle: {
            minWidth: "60px"
        },
    },
    {
        name: "Ngày nhập viện",
        field: "ngayNhapVien",
        headerStyle: {
            minWidth: "60px"
        },
    },
    {
        name: "Cơ sở ghi nhận",
        field: "coSoGhiNhan",
        headerStyle: {
            minWidth: "60px"
        },
    },
]

export const columnTHB = [
    {
        name: "Mã số",
        field: "maSo",
        headerStyle: {
            minWidth: "60px"
        },
    },
    {
        name: "Họ tên",
        field: "hoTen",
        headerStyle: {
            minWidth: "60px"
        },
    },
    {
        name: "Ngày sinh",
        field: "ngaySinh",
        headerStyle: {
            minWidth: "60px"
        },
        render: (row: any, index: number, stt: number) => <span>{moment(row?.ngaySinh).format("DD/MM/YYYY")}</span>
    },
    {
        name: "Giới tính",
        field: "gioiTinh",
        headerStyle: {
            minWidth: "60px"
        },
        render: (row: any, index: number, stt: number) => <span>{GENDER_OPT.find((e) => e.code === row?.gioiTinh)?.name}</span>
    },
    {
        name: "Số điện thoại",
        field: "sdt",
        headerStyle: {
            minWidth: "60px"
        },
    },

]

export const INITIAL_CONFIG_TABLE: iConfigTable = {
    totalElement: 0,
    totalPages: 0,
    numberOfElements: 0,
}

export const SEARCH_OBJECT_INIT: ISearchObjModel = {
    keyword: null,
    tinhId: null,
    huyenId: null,
    xaId: null,
    ngayKhoiPhatTuNgay: null,
    ngayKhoiPhatDenNgay: null,
    ngayTaoBaoCaoTuNgay: null,
    ngayTaoBaoCaoDenNgay: null,
    ngayKetThucTuNgay: null,
    ngayKetThucDenNgay: null,
    trangThaiId: null,
    donViBaoCaoId: null,
    PageNumber: 1,
    PageSize: 10
};

export const TRANG_THAI = [
    {
        code: 0,
        name: "Đang hoạt động"
    },
    {
        code: 1,
        name: "Kết thúc"
    }
]

export const OdichSchema = Yup.object().shape({
    oDich: Yup.object().shape({
        tinh: Yup.object().shape({
            id: Yup.string().nullable().required("Bắt buộc nhập")
        }),
        huyen: Yup.object().shape({
            id: Yup.string().nullable().required("Bắt buộc nhập")
        }),
        xa: Yup.object().shape({
            xaId: Yup.string().nullable().required("Bắt buộc nhập")
        }),
        trangThaiObject: Yup.object().nullable().required("Bắt buộc nhap"),
        tenODich: Yup.string().required("Bắt buộc nhap").nullable(),
        ngayKhoiPhatThbDauTien: Yup.string().required("Bắt buộc nhap").nullable()
    }),
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
    }),
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

        }),
        coSoDieuTri: Yup.object().required("Bắt buộc nhập").nullable(),
        coSoQuanLy: Yup.object().required("Bắt buộc nhập").nullable(),
        noiPhatHien: Yup.string().required("Bắt buộc nhập").nullable(),
    }),

});

const INITIAL_O_DICH: ODich = {
    oDichId: null,
    tinhId: null,
    tinh: null,
    huyenId: null,
    huyen: null,
    xaId: null,
    xa: null,
    benhTruyenNhiemId: 37, // benh sxh (37)
    trangThai: null,
    trangThaiObject: null,
    tenODich: "",
    truongHopBenhId: null,
    xacDinhThbDauTien: null,
    yeuToDichTe: null,
    moTaTomTat: null,
    ngayNhanBaoCao: null,
    ngayKhoiPhatThbDauTien: null,
    ngayKhoiPhatThbCuoiCung: null,
    chumCaBenh: null,
    danhSachTruongHopBenh: null,
    soMacTong: null,
    soMacXn: null,
    soMacDuongTinh: null,
    soChetTong: null,
    soChetXn: null,
    soChetDuongTinh: null,
    nhanXet: null,
    hoatDongChinh: null,
    cacYeuToNguyCo: null,
    vatTuKinhPhi: null,
    thuanLoiKhoKhan: null,
    nhanXetVaBaiHoc: null,
    yKienDeNghi: null
};

export const INITIAL_SO_CA_MAC: SoCaMac = {
    oDichSoCaMacId: null,
    tinhId: null,
    huyenId: null,
    xaId: null,
    tenDiaPhuong: null,
    soMac: null,
    soChet: null
};

export const INITIAL_XET_NGHIEM: XetNghiem = {
    oDichXetNghiemId: null,
    tinhId: null,
    huyenId: null,
    xaId: null,
    tenDiaPhuong: null,
    soXn: null,
    soDuongTinh: null
};

export const INITIAL_BIEN_PHAP_TRIEN_KHAI: BienPhapTrienKhai = {
    oDichBienPhapTrienKhaiId: null,
    hdPhongChongDichId: null,
    hdPhongChongDich: null,
    yKienDeNghi: null
};

export const INITIAL_TIEN_SU_DICH_TE: TienSuDichTe = {
    thoiGianBatDau: null,
    thoiGianKetThuc: null,
    tinhId: null,
    huyenId: null,
    xaId: null,
    diaDiem: null,
    diaDiemNuocNgoai: null,
    doiTuongTiepXucId: null
};

export const INITIAL_THONG_TIN_O_DICH: IThongTinODich = {
    oDich: INITIAL_O_DICH,
    isCreateNewThb: true,
    truongHopBenhId: null,
    truongHopBenh: INITIAL_TRUONG_HOP_BENH,
    doiTuongMacBenh: INITIAL_DOI_TUONG_MAC_BENH,
    soCaMacList: [INITIAL_SO_CA_MAC],
    xetNghiemList: [INITIAL_XET_NGHIEM],
    bienPhapTrienKhaiList: [INITIAL_BIEN_PHAP_TRIEN_KHAI],
    tienSuDichTeList: []
};
