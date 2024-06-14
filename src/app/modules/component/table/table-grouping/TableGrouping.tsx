import { useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import { KTSVG } from "../../../../../_metronic/helpers";
import useMultiLanguage from "../../../../hook/useMultiLanguage";
import { DEFAULT_PAGE_INDEX } from "../../../utils/Constant";
import { handlePagesChange, handleRowsPerPageChange } from "../../../utils/PageUtils";
import { TablePagination } from "../table-custom/TablePagination";
import { rowPerPage } from './../../../constant';
import RowTotal from "./body/RowTotal";
import TableBodyRow from "./body/TableBodyRow";
import TableHeader from "./header/TableHeader";
import "./table-grouping.scss";
import { filterChild } from "./utils/tableGroupingUtils";

export interface IColumns {
    name: string;
    field: string;
    child?: IColumns[];
    headerStyle?: React.CSSProperties;
    cellStyle?: React.CSSProperties;
    render?: (row: any, STT: number, index: number, data: any) => string | number | React.ReactNode;
    type?: any
    numberFixed?: number;
    isSticky?: boolean;
}

export interface IColumnsTotal {
    field: string;
    colSpan?: number;
    cellStyle?: React.CSSProperties;
    render?: (row: any) => string | number | React.ReactNode;
    isTitle?: boolean;
    type?: any
    numberFixed?: number;
}

interface IProps {
    columns: IColumns[];
    data: any[];
    totalPages?: number;
    totalElements?: number;
    numberOfElements?: number;
    buttonAdd?: boolean;
    buttonExportExcel?: boolean;
    handleExportExcel?: (row: any) => void;
    handleOpenDialog?: (row: any) => void;
    title?: string;
    noPagination?: boolean;
    page?: number;
    handleDoubleClick?: (row: any) => void;
    className?: string;
    showTotalRow?: boolean;
    columnsTotal?: IColumnsTotal[];
    id: string;
    prefixTitleField?: string;
    prefixDataField?: string;
}

function TableGrouping(props: IProps) {
    const {
        columns,
        data,
        totalElements,
        totalPages,
        numberOfElements,
        buttonAdd,
        buttonExportExcel,
        handleExportExcel,
        handleOpenDialog,
        title,
        noPagination = true,
        handleDoubleClick,
        className,
        showTotalRow = false,
        columnsTotal,
        id,
        prefixTitleField = "title",
        prefixDataField = "data"
    } = props;

    const { lang } = useMultiLanguage();
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [page, setPage] = useState<number>(props?.page || DEFAULT_PAGE_INDEX);

    const columnsConvert: IColumns[] = useMemo(() => {
        return filterChild(columns).flat(Infinity);
    }, [columns]);

    return (
        <div className={className || ""}>
            {(buttonAdd || buttonExportExcel || title) && (
                <div className="d-flex align-items-center flex-space-between spaces mb-10">
                    {title && <span className="spaces fs-18 text-header-table fw-600">{title}</span>}
                    <div className="spaces p-0 d-flex align-items-center">
                        {buttonAdd && (
                            <Button className="spaces mx-16 btn-primary" onClick={handleOpenDialog}>
                                <i className="spaces bi bi-plus fs-20 white"></i>
                                <p className="spaces fs-14 m-0 ">{lang("BTN.ADD")}</p>
                            </Button>
                        )}

                        {buttonExportExcel && (
                            <Button className="spaces mr-16 btn-primary" onClick={handleExportExcel}>
                                <KTSVG path="/media/icons/export-excel.svg" /> {lang("BTN.EXPORT")}
                            </Button>
                        )}
                    </div>
                </div>
            )}

            <div className={`table-responsive customs-collapse-row m-0 table-group`}>
                <table className="table-row-dashed dataTable table w-100 border-bottom border-b-2">
                    <TableHeader columns={columns} tableId={id} data={data} />
                    <tbody className="bg-white">
                        {data?.length > 0 ? (
                            <>
                                {data.map((row, index: number) => (
                                    <TableBodyRow
                                        key={index}
                                        currentIndex={index}
                                        columns={columnsConvert}
                                        rowData={row}
                                        page={page}
                                        rowsPerPage={rowsPerPage}
                                        handleDoubleClick={handleDoubleClick}
                                        tableId={id}
                                        prefixDataField={prefixDataField}
                                        prefixTitleField={prefixTitleField}
                                        columnsTotal={columnsTotal}
                                        showTotalRow={showTotalRow}
                                    />
                                ))}
                                {columnsTotal && showTotalRow && (
                                    <RowTotal
                                        data={data}
                                        columnsTotal={columnsTotal || []}
                                        prefixDataField={prefixDataField}
                                        prefixTitleField={prefixTitleField}
                                    />
                                )}
                            </>
                        ) : (
                            <tr>
                                <td colSpan={columnsConvert.length} className="text-center border">
                                    {lang("TABLE.DATA.EMPTY")}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {!noPagination && (
                <TablePagination
                    page={page}
                    setPage={setPage}
                    handlePagesChange={handlePagesChange}
                    handleRowsPerPageChange={handleRowsPerPageChange}
                    rowsForPage={rowPerPage}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                    totalPages={totalPages || 0}
                    totalElements={totalElements || 0}
                    numberOfElements={numberOfElements || 0}
                />
            )}
        </div>
    );
}

export default TableGrouping;
