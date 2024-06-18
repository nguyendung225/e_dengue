import { OCTTable } from "@oceantech/oceantech-ui";
import { ChangeEvent, useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import AppContext from "../../../../AppContext";
import { RESPONSE_STATUS_CODE, TYPE } from "../../../utils/Constant";
import { exportToFile } from "../../../utils/FunctionUtils";
import { truongHopBenhExcelColumns } from "../../tim-kiem-truong-hop-benh/constants/constants";
import {
    checkData,
    exportFileHanhChinh,
    exportFileMau,
    exportInvalidTHB,
    fileUpload,
    importValidTHB,
} from "../servives/Services";
import { FILE_TYPE } from "../../../component/FileUpload/constant";

type Props = {};

const NhapTuExcel = (props: Props) => {
    const { setPageLoading } = useContext(AppContext);
    const [selectedFile, setSelectedFile] = useState<any>();
    const [idFile, setIdFile] = useState<string>("");
    const [dataTHB, setDataTHB] = useState<any>(null);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && Array.from(e.target.files).length > 0) {
            setSelectedFile(Array.from(e.target.files)[0]);
            setDataTHB(null);
            setIdFile("");
        }
    };

    const handleDownloadFile = (
        fileName: string,
        service: Function,
        params?: any
    ) => {
        exportToFile({
            exportAPI: () => (params ? service(params) : service()),
            fileName: fileName,
            type: TYPE.EXCEL,
            setPageLoading,
        });
    };

    const handleUploadFile = async () => {
        try {
            setPageLoading(true);
            const newFile = new File([selectedFile], selectedFile.name, {
                type: selectedFile.type,
            });
            const { data } = await fileUpload(newFile);
            if (data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
                toast.success("Tải lên thành công");
                setIdFile(data?.data);
            }
        } catch (error) {
            console.error(error);
            toast.error(error as string);
        } finally {
            setPageLoading(false);
        }
    };

    const handleCheckData = async () => {
        try {
            setPageLoading(true);
            const { data } = await checkData(idFile);
            if (data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
                toast.success("Kiểm tra thành công");
                setDataTHB(data.data);
                !data?.data?.listThbHopLe?.length && toast.warning("Không có THB hợp lệ")
            }
        } catch (error) {
            console.error(error);
            toast.error(error as string);
        } finally {
            setPageLoading(false);
        }
    };

    const handleImportTHB = async () => {
        try {
            setPageLoading(true);
            await importValidTHB(idFile);
            setDataTHB(null);
            toast.success("Nhập thành công");
        } catch (error) {
            console.error(error);
            toast.error(error as string);
        } finally {
            setPageLoading(false);
        }
    };

    const handleReChange = () => {
        setSelectedFile(null);
        setIdFile("");
        setDataTHB([]);
    };

    const handleInputClick = (event: any) => {
        event.target.value = null;
    };

    return (
        <div className="section-container spaces mt-15">
            <div className="border-bottom">
                <div className="spaces p-16 fs-18 fw-bold text-uppercase color-dark-red ">
                    <i className="bi bi-stack color-dark-red fs-4 mr-1"></i>
                    THÊM MỚI TRƯỜNG HỢP BỆNH BẰNG EXCEL
                </div>
            </div>
            <div className="d-flex align-items-center spaces p-16 spaces gap-8">
                <div className="rotate-90 ">
                    <i className="bi bi-hand-index "></i>
                </div>
                <div className="fw-bold spaces">Lựa chọn file Excel</div>
                <Button className="button-primary">
                    <input
                        type="file"
                        hidden
                        id="upload"
                        onChange={onChange}
                        onClick={handleInputClick}
                        accept={FILE_TYPE.XLSX + "," + FILE_TYPE.XLS}
                    />
                    <i className="bi bi-plus"></i>
                    <label htmlFor="upload">Chọn file</label>
                </Button>
                <Button className="button-primary" onClick={handleReChange}>
                    <i className="bi bi-recycle"></i>
                    Thực hiện lại
                </Button>
            </div>
            {selectedFile && (
                <div className="alert alert-primary d-flex align-items-center justify-content-between spaces mx-16">
                    <div>
                        <i className="bi bi-file-earmark-excel spaces mr-4"></i>
                        File đã chọn
                    </div>
                    <div className="min-w-175px">
                        {" "}
                        {selectedFile?.name?.length < 30
                            ? selectedFile?.name
                            : selectedFile?.name?.slice(0, 25) + "..."}
                    </div>
                    <span className="ms-2 text-gray-600 min-w-90px">
                        Size:{" "}
                        {(
                            (selectedFile?.contentSize || selectedFile.size) /
                            1024
                        )?.toFixed(2)}{" "}
                        KB
                    </span>
                    <div className="d-flex align-items-center gap-2">
                        <Button
                            disabled={Boolean(idFile)}
                            onClick={handleUploadFile}
                            className="button-primary"
                        >
                            <i className="bi bi-upload"></i>Tải lên
                        </Button>
                        <Button
                            onClick={handleCheckData}
                            disabled={Boolean(!idFile)}
                            className="button-primary"
                        >
                            <i className="bi bi-check"></i>Kiểm tra dữ liệu
                        </Button>
                        <Button
                            disabled={Boolean(!dataTHB?.listThbHopLe?.length)}
                            className="button-primary"
                            onClick={handleImportTHB}
                        >
                            <i className="bi bi-floppy"></i>Lưu các trường hợp
                            bệnh hợp lệ
                        </Button>
                    </div>
                </div>
            )}
            {dataTHB?.listThbHopLe?.length > 0 && (
                <div className="spaces px-20">
                    <div className="spaces pt-8 fs-18 fw-bold text-uppercase color-dark-red ">
                        Danh sách trường hợp bệnh hợp lệ
                    </div>
                    <OCTTable
                        id="ds-hop-le"
                        data={dataTHB?.listThbHopLe}
                        columns={truongHopBenhExcelColumns}
                        justFilter={true}
                        fixedColumnsCount={3}
                        notDelete={true}
                        notEdit={true}
                        noToolbar={true}
                        unSelectedAll={true}
                        noPagination
                    />
                </div>
            )}

            {dataTHB?.listThbKhongHopLe?.length > 0 && (
                <div className="spaces px-20 pb-12">
                    <div className="d-flex justify-content-between align-items-center mt-2">
                        <div className="spaces pt-8 fs-18 fw-bold text-uppercase color-dark-red ">
                            Danh sách trường hợp bệnh không hợp lệ
                        </div>
                        <Button
                            className="button-primary"
                            onClick={() =>
                                handleDownloadFile(
                                    idFile,
                                    exportInvalidTHB,
                                    idFile
                                )
                            }
                        >
                            Xuất Excel
                        </Button>
                    </div>
                    <OCTTable
                        id="ds-hop-khong-le"
                        data={dataTHB?.listThbKhongHopLe}
                        columns={truongHopBenhExcelColumns}
                        justFilter={true}
                        notDelete={true}
                        fixedColumnsCount={3}
                        notEdit={true}
                        noToolbar={true}
                        unSelectedAll={true}
                        noPagination
                    />
                </div>
            )}

            <div className="spaces px-16">
                <p>
                    <i className="bi bi-chevron-right fs-9 text-dark"></i>File
                    excel có định dạng .xls hoặc .xlsx(Hoặc tải
                    <span
                        className="text-primary cursor-pointer fw-bold spaces ml-2"
                        onClick={() =>
                            handleDownloadFile("FileMau", exportFileMau)
                        }
                    >
                        File mẫu
                    </span>
                    )
                </p>
                <p>
                    <i className="bi bi-chevron-right fs-9 text-dark"></i>Tải
                    danh sách đơn vị hành chính sử dụng:
                    <span
                        onClick={() =>
                            handleDownloadFile(
                                "FileHanhChinh",
                                exportFileHanhChinh
                            )
                        }
                        className="text-primary cursor-pointer fw-bold spaces ml-2"
                    >
                        Tại đây
                    </span>
                </p>
                <p>
                    <i className="bi bi-chevron-right fs-9 text-dark"></i>Khuyến
                    cáo: Mỗi lần tải lên file excel, số lượng trường hợp bệnh
                    không quá 100 ca để dễ dàng kiểm tra, chỉnh sửa ca bệnh nếu
                    có lỗi dữ liệu không hợp lệ
                </p>
                <p>
                    <i className="bi bi-chevron-right fs-9 text-dark"></i>Ghi
                    chú: Sau khi Lưu dữ liệu hợp lệ hệ thống sẽ lưu các trường
                    hợp bệnh hợp lệ và download danh sách cách trường hợp bệnh
                    lỗi(nếu có)
                </p>
            </div>
        </div>
    );
};

export default NhapTuExcel;