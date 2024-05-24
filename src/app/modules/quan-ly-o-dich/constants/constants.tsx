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