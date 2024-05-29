import moment from "moment";
import { SearchObjectModel } from "../../models/TimKiemTruongHopBenhModels";
import { renderStatusThb } from "../../../utils/FormatUtils";

export const truongHopBenhColumns = [
  {
    name: "STT",
    field: "stt",
    render: (row: any, index: number, stt: number) => <span>{stt}</span>,
  },
  {
    name: "Họ và tên",
    field: "hoTen",
    headerStyle: {
      minWidth: "140px",
    },
    cellStyle: {
      textAlign: "left",
    },
  },
  {
    name: "Chuẩn đoán",
    field: "TenChanDoan",
    headerStyle: {
      minWidth: "120px",
    },
    cellStyle: {
      textAlign: "center",
    },
  },
  {
    name: "Tình trạng hiện tại",
    field: "TinhTrangHienNay",
    headerStyle: {
      minWidth: "120px",
    },
    cellStyle: {
      textAlign: "left",
    },
    render: (rowData: any) =>
      TINH_TRANG_HIEN_NAY.find(
        (item) => item.code === rowData?.tinhTrangHienNay
      )?.name,
  },
  {
    name: "Tỉnh",
    field: "tenTinh",
    headerStyle: {
      minWidth: "120px",
    },
    cellStyle: {
      textAlign: "center",
    },
  },
  {
    name: "Huyện",
    field: "tenHuyen",
    headerStyle: {
      minWidth: "120px",
    },
    cellStyle: {
      textAlign: "center",
    },
  },
  {
    name: "Xã",
    field: "tenXa",
    headerStyle: {
      minWidth: "120px",
    },
    cellStyle: {
      textAlign: "center",
    },
  },
  {
    name: "Cơ sở điều trị",
    field: "TenCoSoGhiNhan",
    headerStyle: {
      minWidth: "120px",
    },
    cellStyle: {
      textAlign: "left",
    },
  },
  {
    name: "Cơ sở ghi nhận",
    field: "TenCoSoDieuTri",
    headerStyle: {
      minWidth: "120px",
    },
    cellStyle: {
      textAlign: "left",
    },
  },
  {
    name: "Ngày khỏi phát",
    field: "ngayKhoiPhat",
    headerStyle: {
      minWidth: "120px",
    },
    cellStyle: {
      textAlign: "center",
    },
    render: (rowData: any) => rowData.ngayKhoiPhat && moment(rowData.ngayKhoiPhat).format("DD-MM-YYYY"),
  },
  {
    name: "Ngày nhập viện",
    field: "ngayNhapVien",
    headerStyle: {
      minWidth: "120px",
    },
    cellStyle: {
      textAlign: "center",
    },
    render: (rowData: any) => rowData.ngayNhapVien && moment(rowData.ngayNhapVien).format("DD-MM-YYYY"),
  },
  {
    name: "Ngày báo cáo",
    field: "ngayNopBcDieuTra",
    headerStyle: {
      minWidth: "120px",
    },
    cellStyle: {
      textAlign: "center",
    },
    render: (rowData: any) => rowData.ngayNopBcDieuTra && moment(rowData.ngayNopBcDieuTra).format("DD-MM-YYYY"),
  },
  {
    name: "TT",
    field: "luuStatus",
    headerStyle: {
      minWidth: "50px",
    },
    cellStyle: {
      textAlign: "center",
    },
    render: (rowData: any) =>  renderStatusThb(rowData.luuStatus)
  },
];

export const GENDER_OPTION = [
  { name: "Nam", code: 0 },
  { name: "Nữ ", code: 1 },
];

export const SEARCH_OBJECT_INIT: SearchObjectModel = {
  keyword: "",
  thoiGianBatDau: null,
  thoiGianKetThuc: null,
  benhIds: null,
  listTrangThai: null,
  tinhId: null,
  huyenId: null,
  xaId: null,
  hoTen: "",
  gioiTinh: null,
  ngheNghiepId: null,
  tuNgayKhoiPhat: null,
  denNgayKhoiPhat: null,
  tuNgayNhapVien: null,
  denNgayNhapVien: null,
  tuNgayRaVien: null,
  denNgayRaVien: null,
  kqXetNghiem: null,
  tuNgayLayMau: null,
  denNgayLayMau: null,
  donViThucHienXn: null,
  tuNgayTraKetQuaXn: null,
  denNgayTraKetQuaXn: null,
  coSoDieuTriId: null,
  isNopTroLen: null,
  pageNumber: 1,
  pageSize: 10,
  phanLoai: null,
  listTinhTrangHienNay: [],
  tuNgayNhapBaoCao: moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD'),
  denNgayNhapBaoCao: moment().endOf('month').format('YYYY-MM-DD'),
  coSoCreateId: null,
};

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
    name: "Tử Vong",
  },
  {
    code: 4,
    name: "Chuyển viện",
  },
  {
    code: 5,
    name: "Tình trạng khác",
  },
];

export const LIST_TRANG_THAI = [
  {
    code: 0,
    name: "nặng",
  },
  {
    code: 1,
    name: "Khỏi bệnh",
  },
  {
    code: 2,
    name: "Bình thường",
  },
];

export const KQ_XET_NGHIEM = [
  {
    code: 0,
    name: "Dương tính",
  },
  {
    code: 1,
    name: "Âm tính",
  },
  {
    code: 2,
    name: "Chưa có kết quả",
  },
  {
    code: 3,
    name: "Không thực hiện",
  },
];

export const PHAN_LOAI_QUAN_LY = [
  {
    code: 0,
    name: "Tất cả",
  },
  {
    code: 1,
    name: "Cơ sở tự nhập",
  },
  {
    code: 2,
    name: "Chuyến đến",
  },
  {
    code: 3,
    name: "Chuyến đi",
  },
  {
    code: 4,
    name: "Cơ sở quản lý",
  },
];