import { OCTAutocomplete, OCTTextValidator } from "@oceantech/oceantech-ui";
import { ISearchObjModel } from "../models/quanLyODichModels";

export const dsOBenhColumns = [
    {
        name: "#",
        field: "",
        render: (row: any, index: number, stt: number) => <span>{stt}</span>
    },
    {
        name: "Địa điểm xảy ra ổ dịch",
        field: "hoVaTen",
        headerStyle: {
            minWidth: "120px"
        },
        cellStyle: {
            textAlign: "center",
        },
    },
    {
        name: "Trạng thái",
        field: "gioiTinh",
        headerStyle: {
            minWidth: "60px"
        },
    },
    {
        name: "Ngày khởi phát",
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
        name: "Ngày kết thúc",
        field: "ngayTraKQXN",
        headerStyle: {
            minWidth: "120px"
        },
    },
    {
        name: "Số ca mắc",
        field: "birthDate",
        headerStyle: {
            minWidth: "100px"
        },
    },
    {
        name: "Số ca tử vong",
        field: "ngayTraKQXN",
        headerStyle: {
            minWidth: "120px"
        },
    },
    {
        name: "Ngày báo cáo",
        field: "birthDate",
        headerStyle: {
            minWidth: "100px"
        },
    },
    {
        name: "Đơn vị báo cáo",
        field: "ngayTraKQXN",
        headerStyle: {
            minWidth: "120px"
        },
    },
    {
        name: "Tỉnh báo cáo",
        field: "birthDate",
        headerStyle: {
            minWidth: "100px"
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

export const dsSoMauXetNghiemColumns = [
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
    },
    {
        name: "Ngày",
        field: "ngay",
        headerStyle: {
            minWidth: "60px"
        },
    },
    {
        name: "Số mẫu làm XN",
        field: "soMauXN",
        headerStyle: {
            minWidth: "60px"
        },
    },
    {
        name: "Số mẫu (+)",
        field: "soMau",
        headerStyle: {
            minWidth: "60px"
        },
    },
]

export const dsSoMacTuVongColumns = [
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
        field: "tenBenhNhan",
        headerStyle: {
            minWidth: "60px"
        },
    },
    {
        name: "Ngày",
        field: "ngaySinh",
        headerStyle: {
            minWidth: "60px"
        },
    },
    {
        name: "Số mắc",
        field: "tenBenhNhan",
        headerStyle: {
            minWidth: "60px"
        },
    },
    {
        name: "Số chết",
        field: "ngaySinh",
        headerStyle: {
            minWidth: "60px"
        },
    },
]

export const dsBienPhapPhongChongColumns = ({handleDeleteRow}: any) => {

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
                    <OCTAutocomplete
                        className="flex-row min-w-80"
                        name="hoatDong"
                        value={row?.hoatDong}
                        onChange={() => { }}
                        options={[]}
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
                        onChange={() => { }}
                        options={[]}
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
                        className="flex-row min-w-80"
                        name="yKienDeNghi"
                        type="text"
                        value={row?.yKienDeNghi}
                        onChange={() => { }}
                        options={[]}
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
                    <div onClick={() => {handleDeleteRow(row, index)}}>delete</div>
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

export const initSearchObj: ISearchObjModel = {
    keyword: "",
    tinhId: "",
    huyenId: "",
    xaId: "",
    ngayKhoiPhatTuNgay: "",
    ngayKhoiPhatDenNgay: "",
    ngayTaoBaoCaoTuNgay: "",
    ngayTaoBaoCaoDenNgay: "",
    ngayKetThucTuNgay: "",
    ngayKetThucDenNgay: "",
    trangThaiId: "",
    donViBaoCaoId: ""
};
