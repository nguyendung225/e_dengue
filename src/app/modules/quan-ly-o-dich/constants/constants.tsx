import { OCTAutocomplete, OCTTextValidator } from "@oceantech/oceantech-ui";
import moment from "moment";
import { Link } from "react-router-dom";
import { GENDER_OPT, INITIAL_DOI_TUONG_MAC_BENH, INITIAL_TRUONG_HOP_BENH } from "../../quan-ly-truong-hop-benh/danh-sach-truong-hop-benh/constants/constant";
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

export const dsOBenhColumns = () => {
    return [
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
            render: (rowData: any) => {
                return (
                    <Link to={`/chinh-sua-o-dich/${rowData?.oDichId}`} className="cursor-pointer text-primary">
                        {rowData?.tenODich + " - " + rowData?.xaTen + " - " + rowData?.huyenTen + " - " + rowData?.tinhTen}
                    </Link>
                )
            }
        },
        {
            name: "Trạng thái",
            field: "trangThai",
            headerStyle: {
                minWidth: "120px"
            },
            render: (rowData: any) => {
                return <div className={`${rowData?.trangThai === TRANG_THAI_O_DICH[0].code ? "text-danger" : ""}`}>
                    {TRANG_THAI_O_DICH.find((item: any) => item.code === rowData?.trangThai)?.value}
                </div>
            }
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
}

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

export const dsSoMauXetNghiemColumns = ({ handleDeleteRow, handleChange, values, errors, touched }: any) => {
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
                    className="spaces min-h-54"
                    type="text"
                    isRequired
                    name={`xetNghiemList[${index}].tenDiaPhuong`}
                    defaultValue={values?.xetNghiemList[index]?.tenDiaPhuong}
                    onBlur={handleChange}
                    errors={errors?.xetNghiemList?.[index]?.tenDiaPhuong}
                    touched={touched?.xetNghiemList?.[index]?.tenDiaPhuong}
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
                    className="spaces min-h-54"
                    name={`xetNghiemList[${index}].ngayCapNhat`}
                    defaultValue={values?.xetNghiemList[index]?.ngayCapNhat && moment(values?.xetNghiemList[index]?.ngayCapNhat).format("YYYY-MM-DD")}
                    onBlur={handleChange}
                    errors={errors?.xetNghiemList?.[index]?.ngayCapNhat}
                    touched={touched?.xetNghiemList?.[index]?.ngayCapNhat}
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
                    className="spaces min-h-54"
                    name={`xetNghiemList[${index}].soXn`}
                    defaultValue={values?.xetNghiemList[index]?.soXn}
                    onBlur={handleChange}
                    errors={errors?.xetNghiemList?.[index]?.soXn}
                    touched={touched?.xetNghiemList?.[index]?.soXn}
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
                    className="spaces min-h-54"
                    isRequired
                    name={`xetNghiemList[${index}].soDuongTinh`}
                    defaultValue={values?.xetNghiemList[index]?.soDuongTinh}
                    onBlur={handleChange}
                    rrors={errors?.xetNghiemList?.[index]?.soDuongTinh}
                    touched={touched?.xetNghiemList?.[index]?.soDuongTinh}
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

export const dsSoMacTuVongColumns = ({ handleDeleteRow, handleChangeField, values, errors, touched }: any) => {

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
            field: "tenDiaPhuong",
            headerStyle: {
                minWidth: "60px"
            },
            cellStyle: {
                padding: "8px",
            },
            render: (row: any, index: number, stt: number) => (
                <OCTTextValidator
                    type="text"
                    isRequired
                    className="spaces min-h-54"
                    key={index}
                    name={`soCaMacList[${index}].tenDiaPhuong`}
                    defaultValue={values?.soCaMacList[index]?.tenDiaPhuong}
                    onBlur={handleChangeField}
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
            cellStyle: {
                padding: "8px",
            },
            render: (row: any, index: number, stt: number) => (
                <OCTTextValidator
                    type="date"
                    className="spaces min-h-54"
                    isRequired
                    name={`soCaMacList[${index}].ngayCapNhat`}
                    defaultValue={values?.soCaMacList[index]?.ngayCapNhat && moment(values?.soCaMacList[index]?.ngayCapNhat).format("YYYY-MM-DD")}
                    onBlur={handleChangeField}
                    errors={errors?.soCaMacList?.[index]?.ngayCapNhat}
                    touched={touched?.soCaMacList?.[index]?.ngayCapNhat}
                />
            )
        },
        {
            name: "Số mắc",
            field: "tenBenhNhan",
            headerStyle: {
                width: "100px"
            },
            cellStyle: {
                padding: "8px",
            },
            render: (row: any, index: number, stt: number) => (
                <OCTTextValidator
                    type="text"
                    className="spaces min-h-54"
                    isRequired
                    name={`soCaMacList[${index}].soMac`}
                    defaultValue={values?.soCaMacList[index]?.soMac}
                    onBlur={handleChangeField}
                    errors={errors?.soCaMacList?.[index]?.soMac}
                    touched={touched?.soCaMacList?.[index]?.soMac}
                />
            )
        },
        {
            name: "Số chết",
            field: "ngaySinh",
            headerStyle: {
                width: "100px"
            },
            cellStyle: {
                padding: "8px",
            },
            render: (row: any, index: number, stt: number) => (
                <OCTTextValidator
                    type="text"
                    isRequired
                    className="spaces min-h-54"
                    name={`soCaMacList[${index}].soChet`}
                    defaultValue={values?.soCaMacList[index]?.soChet}
                    onBlur={handleChangeField}
                    errors={errors?.soCaMacList?.[index]?.soChet}
                    touched={touched?.soCaMacList?.[index]?.soChet}
                />
            )
        },
        {
            name: "",
            field: "thaoTac",
            headerStyle: {
                minWidth: "60px"
            },
            cellStyle: {
                padding: "8px",
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

export const dsBienPhapPhongChongColumns = ({ handleDeleteRow, handleChange, values, setFieldValue, errors, touched }: any) => {

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
                    <div className="spaces min-h-54">
                        <OCTAutocomplete
                            searchFunction={getListHoatDongChongDich}
                            urlData='data.data'
                            getOptionLabel={(option) => option?.tenHoatDong}
                            options={[]}
                            value={values.bienPhapTrienKhaiList[index]?.hdPhongChongDich}
                            onChange={(option) => {
                                setFieldValue(`bienPhapTrienKhaiList[${index}].hdPhongChongDich`, option)
                            }}
                            searchObject={{}}
                            errors={errors?.bienPhapTrienKhaiList?.[index]?.hdPhongChongDich}
                            touched={touched?.bienPhapTrienKhaiList?.[index]?.hdPhongChongDich}
                        />
                    </div>
                );
            }
        },
        {
            field: "ngay",
            name: "Ngày",
            headerStyle: {
                minWidth: "120px"
            },
            render: (row: any, index: number) => {
                return (
                    <OCTTextValidator
                        className="flex-row min-w-80 spaces min-h-54"
                        type="date"
                        name={`bienPhapTrienKhaiList[${index}].ngayCapNhat`}
                        defaultValue={values?.bienPhapTrienKhaiList[index]?.ngayCapNhat && moment(values?.bienPhapTrienKhaiList[index]?.ngayCapNhat).format("YYYY-MM-DD")}
                        onBlur={handleChange}
                        errors={errors?.bienPhapTrienKhaiList?.[index]?.ngayCapNhat}
                        touched={touched?.bienPhapTrienKhaiList?.[index]?.ngayCapNhat}
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
                        className="spaces min-h-54"
                        name={`bienPhapTrienKhaiList[${index}].yKienDeNghi`}
                        defaultValue={values?.bienPhapTrienKhaiList[index]?.yKienDeNghi}
                        onBlur={handleChange}
                        errors={errors?.bienPhapTrienKhaiList?.[index]?.yKienDeNghi}
                        touched={touched?.bienPhapTrienKhaiList?.[index]?.yKienDeNghi}
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



const INITIAL_O_DICH: ODich = {
    ngayKetThucODich: "",
    oDichId: null,
    tinhId: null,
    tinh: null,
    huyenId: null,
    huyen: null,
    xaId: null,
    xa: null,
    benhTruyenNhiemId: 37, // benh sxh (37)
    trangThai: null,
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
    soMac: 0,
    soChet: 0,
    ngayCapNhat: null
};

export const INITIAL_XET_NGHIEM: XetNghiem = {
    oDichXetNghiemId: null,
    tinhId: null,
    huyenId: null,
    xaId: null,
    tenDiaPhuong: null,
    soXn: 0,
    soDuongTinh: 0,
    ngayCapNhat: null
};

export const INITIAL_BIEN_PHAP_TRIEN_KHAI: BienPhapTrienKhai = {
    oDichBienPhapTrienKhaiId: null,
    hdPhongChongDichId: null,
    hdPhongChongDich: null,
    yKienDeNghi: null,
    ngayCapNhat: null
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
