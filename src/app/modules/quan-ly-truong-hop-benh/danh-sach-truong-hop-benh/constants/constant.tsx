import * as Yup from "yup";

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
        code: "01",
        name: "Nam",
    },

    {
        code: "02",
        name: "Nữ",
    },
]

export const YES_NO_OPT = [
    {
        code: "01",
        name: "Có",
    },

    {
        code: "02",
        name: "Không",
    },
]

export const KeyTab = {
    TT_HANH_CHINH: "0",
    TT_CHAN_DOAN: "1",
    TT_GHI_NHAN: "2",
};


export const hanhChinhSchema = Yup.object().shape({
    hoTen: Yup.string().required("Bắt buộc nhập"),
    ngaySinh: Yup.string().required("Bắt buộc nhập"),
    danToc: Yup.string().required("Bắt buộc nhập"),
    cccd: Yup.string().when("khongKhaiThacDuocCCCD",{
        is: false,
        then: Yup.string().required("Bắt buộc nhập"),
        otherwise: Yup.string().notRequired()
    }),
    dienThoai: Yup.string().when("khongKhaiThacDuocSoDienThoai",{
        is: false,
        then: Yup.string().required("Bắt buộc nhập"),
        otherwise: Yup.string().notRequired()
    }),
    diaChiHienNay: Yup.string().required("Bắt buộc nhập"),
});

export const chanDoanSchema = hanhChinhSchema.shape({
    ngayNhapVienKham: Yup.string().required("Bắt buộc nhập"),
    ngayLayMau: Yup.string().when("layMauXetNghiemChanDoan", {
        is: YES_NO_OPT[0].code,
        then: Yup.string().required("Bắt buộc nhập"),
        otherwise: Yup.string().notRequired()
    }),
    tenXetNghiem: Yup.string().when("layMauXetNghiemChanDoan", {
        is: YES_NO_OPT[0].code,
        then: Yup.string().required("Bắt buộc nhập"),
        otherwise: Yup.string().notRequired()
    }),
});

export const ghiNhanSchema = chanDoanSchema.shape({
    tenNguoiBaoCao: Yup.string().required("Bắt buộc nhập"),
})


export const tabConfig = {
    [KeyTab.TT_HANH_CHINH]: { schema: hanhChinhSchema, prevTab: null, nextTab: KeyTab.TT_CHAN_DOAN },
    [KeyTab.TT_CHAN_DOAN]: { schema: chanDoanSchema, prevTab: KeyTab.TT_HANH_CHINH, nextTab: KeyTab.TT_GHI_NHAN },
    [KeyTab.TT_GHI_NHAN]: { schema: ghiNhanSchema, prevTab: KeyTab.TT_CHAN_DOAN, nextTab: null }
};