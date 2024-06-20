import moment from "moment";
import { IColumns, IColumnsTotal } from "../../component/table/table-grouping/TableGrouping";
import { IBaoCao, IDiaPhuong, ISearchBaoCao, ITongCong, iConfigTable } from "../model/model";

export const INITIAL_CONFIG_TABLE: iConfigTable = {
    totalElement: 0,
    totalPages: 0,
    numberOfElements: 0,
}

export const SEARCH_OBJECT_INIT : ISearchBaoCao = {
    tinhIds: null,
    huyenIds: null,
    xaIds: null,
    tuan: null,
    nam: moment().year(),
    tuNgay: moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD'),
    denNgay: moment().format('YYYY-MM-DD'),
    capDoRoot: null,
}

export const columnBaoCaoTuan: IColumns[] = [
    {
        name: "STT",
        field: "",
        render: (row: any, index: number, stt: number) => <span>{stt}</span>,
        cellStyle: {
            fontSize: "16px"
        },
    },
    {
        name: "Địa phương",
        field: "tenDiaPhuong",
        headerStyle: {
            minWidth: "250px"
        },
        cellStyle: {
            fontSize: "16px"
        },
    },
    {
        name: "Số mắc",
        field: "",
        child: [
            {
                name: "SXDH và SXHD có dấu hiệu cảnh báo",
                field: "sxhCanhBao",
                headerStyle: {
                    minWidth: "80px"
                },
                cellStyle: {
                    fontSize: "16px"
                },
                child: [
                    {
                        name: "TS",
                        field: "tongSoDauHieu",
                        headerStyle: {
                            minWidth: "80px"
                        },
                        cellStyle: {
                            fontSize: "16px"
                        }
                    },
                    {
                        name: "≤15T",
                        field: "tongSoDuoi15",
                        headerStyle: {
                            minWidth: "80px"
                        },
                        cellStyle: {
                            fontSize: "16px"
                        }
                    },
                    {
                        name: "CD",
                        field: "congDonDauHieu",
                        headerStyle: {
                            minWidth: "80px"
                        },
                        cellStyle: {
                            fontSize: "16px"
                        }
                    },
                ]
            },
            {
                name: "SXH Dengue nặng",
                field: "sxhNang",
                headerStyle: {
                    minWidth: "80px"
                },
                cellStyle: {
                    fontSize: "16px"
                },
                child: [
                    {
                        name: "TS",
                        field: "tongSoNang",
                        headerStyle: {
                            minWidth: "80px"
                        },
                        cellStyle: {
                            fontSize: "16px"
                        }
                    },
                    {
                        name: "≤15T",
                        field: "tongSoNangDuoi15",
                        headerStyle: {
                            minWidth: "80px"
                        },
                        cellStyle: {
                            fontSize: "16px"
                        }
                    },
                    {
                        name: "cdNang",
                        field: "congDonNang",
                        headerStyle: {
                            minWidth: "80px"
                        },
                        cellStyle: {
                            fontSize: "16px"
                        }
                    },
                ]
            },
            {
                name: "Tổng cộng mắc",
                field: "tongSo",
                headerStyle: {
                    minWidth: "80px"
                },
                cellStyle: {
                    fontSize: "16px"
                }
            },
            {
                name: "Cộng dồn mắc",
                field: "congDon",
                headerStyle: {
                    minWidth: "80px"
                },
                cellStyle: {
                    fontSize: "16px"
                }
            },
        ]
    },
    {
        name: "Số chết",
        field: "",
        child: [
            {
                name: "Tổng số chết",
                field: "tongSoTuVong",
                headerStyle: {
                    minWidth: "80px"
                },
                cellStyle: {
                    fontSize: "16px"
                }
            },
            {
                name: "≤15T",
                field: "tongSoTuVongDuoi15",
                headerStyle: {
                    minWidth: "80px"
                },
                cellStyle: {
                    fontSize: "16px"
                }
            },
            {
                name: "Cộng dồn chết",
                field: "congDonTuVong",
                headerStyle: {
                    minWidth: "80px"
                },
                cellStyle: {
                    fontSize: "16px"
                }
            },
            
        ]
    },
];

export const columnTotalBaoCao: IColumnsTotal[] = [
    {
        colSpan: 2,
        isTitle: true,
        field: "title",
        cellStyle: {
            fontSize: "15px",
            fontWeight: "bold",
            textAlign: "left",
            paddingLeft: "16px"
        },
        render: () => "Tổng cộng"
    },
    {
        field: "tongSoDauHieu",
        cellStyle: {
            fontSize: "15px",
            textAlign: "center"
        }
    },
    {
        field: "tongSoDuoi15",
        cellStyle: {
            fontSize: "15px",
            textAlign: "center"
        }
    },
    {
        field: "congDonDauHieu",
        cellStyle: {
            fontSize: "15px",
            textAlign: "center"
        }
    },
    {
        field: "tongSoNang",
        cellStyle: {
            fontSize: "15px",
            textAlign: "center"
        }
    },
    {
        field: "tongSoNangDuoi15",
        cellStyle: {
            fontSize: "15px",
            textAlign: "center"
        }
    },
    {
        field: "congDonNang",
        cellStyle: {
            fontSize: "15px",
            textAlign: "center"
        }
    },
    {
        field: "tongSo",
        cellStyle: {
            fontSize: "15px",
            textAlign: "center"
        }
    },
    {
        field: "congDon",
        cellStyle: {
            fontSize: "15px",
            textAlign: "center"
        }
    },
    {
        field: "tongSoTuVong",
        cellStyle: {
            fontSize: "15px",
            textAlign: "center"
        }
    },
    {
        field: "tongSoTuVongDuoi15",
        cellStyle: {
            fontSize: "15px",
            textAlign: "center"
        }
    },
    {
        field: "congDonTuVong",
        cellStyle: {
            fontSize: "15px",
            textAlign: "center"
        }
    },
];

const listBaoCaoDiaPhuong: IDiaPhuong[] = [
  {
    tenDiaPhuong: "",
    diaPhuongId: 0,
    tongSo: 0,
    tongSoDauHieu: 0,
    tongSoDuoi15: 0,
    tongSoNang: 0,
    tongSoNangDuoi15: 0,
    tongSoTuVong: 0,
    tongSoTuVongDuoi15: 0,
    congDon: 0,
    congDonDauHieu: 0,
    congDonNang: 0,
    congDonTuVong: 0,
  },
];

const tongCong: ITongCong = {
    tenDiaPhuong: "",
    diaPhuongId: 0,
    tongSo: 0,
    tongSoDauHieu: 0,
    tongSoDuoi15: 0,
    tongSoNang: 0,
    tongSoNangDuoi15: 0,
    tongSoTuVong: 0,
    tongSoTuVongDuoi15: 0,
    congDon: 0,
    congDonDauHieu: 0,
    congDonNang: 0,
    congDonTuVong: 0
};

export const initBaoCao: IBaoCao = {
    tenTuyenBaoCao: "",
    listBaoCaoDiaPhuong: listBaoCaoDiaPhuong,
    tongCong: tongCong
};