import { IColumns, IColumnsTotal } from "../../component/table/table-grouping/TableGrouping";
import { TYPE } from "../../utils/Constant";

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
                field: "congChucVienChuc",
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
                        field: "hopDong111",
                        headerStyle: {
                            minWidth: "80px"
                        },
                        cellStyle: {
                            fontSize: "16px"
                        }
                    },
                    {
                        name: "CD",
                        field: "hopDong111",
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
                field: "hopDong111",
                headerStyle: {
                    minWidth: "80px"
                },
                cellStyle: {
                    fontSize: "16px"
                },
                child: [
                    {
                        name: "TS",
                        field: "congChucVienChuc",
                        headerStyle: {
                            minWidth: "80px"
                        },
                        cellStyle: {
                            fontSize: "16px"
                        }
                    },
                    {
                        name: "≤15T",
                        field: "hopDong111",
                        headerStyle: {
                            minWidth: "80px"
                        },
                        cellStyle: {
                            fontSize: "16px"
                        }
                    },
                    {
                        name: "CD",
                        field: "hopDong111",
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
                field: "hopDong111",
                headerStyle: {
                    minWidth: "80px"
                },
                cellStyle: {
                    fontSize: "16px"
                }
            },
            {
                name: "Cộng dồn mắc",
                field: "hopDong111",
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
                field: "congChucVienChuc",
                headerStyle: {
                    minWidth: "80px"
                },
                cellStyle: {
                    fontSize: "16px"
                }
            },
            {
                name: "≤15T",
                field: "hopDong111",
                headerStyle: {
                    minWidth: "80px"
                },
                cellStyle: {
                    fontSize: "16px"
                }
            },
            {
                name: "Cộng dồn chết",
                field: "hopDong111",
                headerStyle: {
                    minWidth: "80px"
                },
                cellStyle: {
                    fontSize: "16px"
                }
            },
            {
                name: "Cộng dồn mắc",
                field: "hopDong111",
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
        field: "",
        cellStyle: {
            fontSize: "15px",
            fontWeight: "bold",
            textAlign: "left",
            paddingLeft: "16px"
        }
    },
    {
        field: "heSoBacLuong",
        type: TYPE.NUMBER_FLOAT
    },
    {
        field: "phuCapTnvk",
        type: TYPE.NUMBER_FLOAT
    },
    {
        field: "phuCapChucVu",
        type: TYPE.NUMBER_FLOAT
    },
    {
        field: "phuCapTrachNhiem",
        type: TYPE.NUMBER_FLOAT
    },
    {
        field: "phuCapDocHai",
        type: TYPE.NUMBER_FLOAT
    },
    {
        field: "phuCapUuDai",
        type: TYPE.NUMBER_FLOAT
    },
    {
        field: "phuCapKhac",
        type: TYPE.NUMBER_FLOAT
    },
    {
        field: "tongSo",
        type: TYPE.NUMBER_FLOAT
    },
    {
        field: "luongTheoNgachBac",
        type: TYPE.NUMBER_FLOAT
    },
    {
        field: "tienPhuCapTnvk",
        type: TYPE.NUMBER_FLOAT
    },
    {
        field: "tongSoPhuCap",
        type: TYPE.NUMBER_FLOAT
    },
    {
        field: "tienPhuCapChucVu",
        type: TYPE.NUMBER_FLOAT
    },
];