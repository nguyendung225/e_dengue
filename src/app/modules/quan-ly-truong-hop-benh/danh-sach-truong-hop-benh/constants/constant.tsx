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