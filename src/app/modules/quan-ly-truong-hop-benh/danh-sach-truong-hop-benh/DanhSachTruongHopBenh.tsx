import { OCTKTSVG, OCTTable } from "@oceantech/oceantech-ui";
import "./styles/danhSachThb.scss";
import { TYPE } from "../../utils/Constant";
import { danhSachThbColumns, getExportedFileList,TRANG_THAI_PHAN_HOI, INIT_TRUONG_HOP_BENH, HINH_THUC_CO_SO } from "./constants/constant";
import { Button } from "react-bootstrap";
import InputSearch from "../../component/input-field/InputSearch";
import ThongTinThb from "./components/ThongTinThb";
import NhapTruongHopBenhModal from './components/NhapTruongHopBenhModal';
import { useContext, useEffect, useState } from "react";
import TimKiemTHBNangCaoModal from "./components/TimKiemTHBNangCaoModal";
import { toast } from "react-toastify";
import AppContext from "../../../AppContext";
import ModalXacNhanTHB from "./components/ModalXacNhanTHB";
import { ISearchObjectModel } from "../models/TimKiemTruongHopBenhModels";
import { searchThbByPage } from "../tim-kiem-truong-hop-benh/services/TimKiemThbServices";
import { IDropdownButton, TruongHopBenh } from "./model/Model";
import { deleteTruongHopBenh, getThongTinTruongHopBenh } from "./servives/Services";
import { SEARCH_OBJECT_INIT } from "../tim-kiem-truong-hop-benh/constants/constants";
import ConfirmDialog from "../../component/confirm-dialog/ConfirmDialog";
import DropdownButton from "../../component/button/DropdownButton";
import { convertListSearchObject, formatDataViewTHB } from "../../utils/FunctionUtils";
import { localStorageItem } from "../../utils/LocalStorage";
import { KEY_LOCALSTORAGE } from "../../auth/core/_consts";
import { authRoles } from "../../auth/authRoles";
import { handleChangePagination } from "../../utils/PageUtils";

const DanhSachTruongHopBenh = () => {
    const { setPageLoading } = useContext(AppContext);
    const [openTruongHopBenhForm, setOpenTruongHopBenhForm] = useState<boolean>(false);
    const [openDeleteTruongHopBenh, setOpenDeleteTruongHopBenh] = useState<boolean>(false);
    const [openSearchAdvanceDialog, setOpenSearchAdvanceDialog] = useState<boolean>(false);
    const [shouldOpenXacNhanThbDialog, setShouldOpenXacNhanThbDialog] = useState<boolean>(false);
    const [truongHopBenhList, setTruongHopBenhList] = useState<any>([]);
    const [searchObject, setSearchObject] = useState<ISearchObjectModel>(SEARCH_OBJECT_INIT);
    const [dataRow, setDataRow] = useState<TruongHopBenh>(INIT_TRUONG_HOP_BENH);
    const [dataForm, setDataForm] = useState<TruongHopBenh>(dataRow);
    const [configTable, setConfigTable] = useState<any>({});
    const [searchKeyword, setsSearchKeyword] = useState<string>("");
    const [exportedFileList, setExportedFileList] = useState<IDropdownButton[]>([]);
    const userData = localStorageItem.get(KEY_LOCALSTORAGE.USER_INFOMATION);

    useEffect(() => {
        setSearchObject((prev) => ({
            ...prev,
            tinh: userData?.tinhInfo ? userData?.tinhInfo : null,
            huyen: userData?.huyenInfo ? userData?.huyenInfo : null,
            xa: userData?.xaInfo ? userData?.xaInfo : null,
        }));
    }, []);

    const getTruongHopBenhList = async (selectFirstRow?: boolean) => {
        try {
            setPageLoading(true);
            let {
              listTinhTrangHienNay,
              tinh,
              huyen,
              xa,
              coSoDieuTri,
              donViThucHienXn,
              coSoGhiNhan,
              gioiTinh,
              ngheNghiep,
              kqXetNghiem,
              phanLoaiQuanLy,
              ...newSearchObject
            } = searchObject;
            const tinhTrangHienNay = convertListSearchObject(
              listTinhTrangHienNay as any[],
              "listTinhTrangHienNay"
            );

            const searchObjTemp: any = {
                ...newSearchObject,
                ...tinhTrangHienNay,
                gioiTinh,
                ngheNghiepId: ngheNghiep?.id,
                phanLoaiQuanLy: phanLoaiQuanLy?.code,
                tinhId: tinh?.id,
                huyenId: huyen?.id,
                xaId: xa?.xaId,
                coSoGhiNhanId: coSoGhiNhan?.id,
                kqXetNghiem,
                donViThucHienXn: donViThucHienXn?.id,
                coSoDieuTriId: coSoDieuTri?.id
            }
            const { data } = await searchThbByPage(searchObjTemp);
            handleSelectFirstRow(data?.data?.data, selectFirstRow);
            setConfigTable({
                totalPages: data?.data?.totalPages,
                totalElements: data?.data?.total,
                numberOfElements:  data?.data?.numberOfElements,
            })
        } catch (error) {
            console.error(error);
            toast.error(error as string);
        } finally {
            setPageLoading(false);
        }
    }

    const handleSelectFirstRow = (data: any[], selectFirstRow?: boolean) => {
        let dataTemp = data;
        let id = dataRow?.truongHopBenh?.truongHopBenhId
        if (selectFirstRow) {
            dataTemp = data.map((item: any, index: number) => {
                return index === 0 ? { ...item, isChecked: true } : item;
            });
            id = dataTemp?.[0]?.truongHopBenhId
        }
        setTruongHopBenhList(dataTemp);
        if (id) {
            getThongTinChiTietTHB(String(id));
        }
        else {
            setDataRow(INIT_TRUONG_HOP_BENH);
        }
    };

    const handleDeleteTruongHopBenh = async () => {
        const id = dataRow?.truongHopBenh?.truongHopBenhId
        try {
            setPageLoading(true);
            id && await deleteTruongHopBenh(id);
            getTruongHopBenhList(true);
            setOpenDeleteTruongHopBenh(false);
        } catch (error) {
            console.error(error);
            toast.error(error as string);
        } finally {
            setPageLoading(false);
        }
    }


    const getThongTinChiTietTHB = async (id: string) => {
        try {
            setPageLoading(true);
            const rest = await getThongTinTruongHopBenh(id);
            setDataRow(formatDataViewTHB(rest.data.data));
        } catch (error) {

        }
        finally {
            setPageLoading(false);
        }
    }

    const handleSelectTHB = (row: any[]) => {
        getThongTinChiTietTHB(row[0]?.truongHopBenhId);
    }

    useEffect(() => {
        getTruongHopBenhList(true);
    }, [searchObject])

    useEffect(()=>{
        setExportedFileList(getExportedFileList(dataRow, setPageLoading));
    }, [dataRow])

    const isChuaXacNhanOrXacNhanSaiThongTin = [
        TRANG_THAI_PHAN_HOI.CHUA_XAC_NHAN,
        TRANG_THAI_PHAN_HOI.XN_SAI_THONG_TIN_HANH_CHINH,
        TRANG_THAI_PHAN_HOI.XN_SAI_THONG_TIN_CHAN_DOAN
    ].includes(dataRow?.truongHopBenh?.trangThaiPhanHoi as number);
    const isTuyenHuyenOrTuyenXa = userData?.phanLoaiCoSo === HINH_THUC_CO_SO.TuyenHuyen 
    || userData?.phanLoaiCoSo === HINH_THUC_CO_SO.TuyenXa;

    return (
        <div className="page-container">
            <div className="left-content-container">
                <div>
                    <div className="ds-header">
                        <div className="d-flex align-items-center">
                            <OCTKTSVG path={'/media/svg/icons/List ul.svg'} svgClassName="spaces w-14 h-14 mr-10" />
                            <span className="title color-dark-red">
                                Danh sách
                            </span>
                        </div>
                        <Button
                            className="button-primary"
                            onClick={() => {
                                setDataForm(INIT_TRUONG_HOP_BENH)
                                setOpenTruongHopBenhForm(true)
                            }}
                        >
                            <OCTKTSVG path='/media/svg/icons/plus.svg' svgClassName='spaces h-14 w-14 color-white' />
                            Thêm mới
                        </Button>
                    </div>
                    <div className="ds-search-box">
                        <div className="box-search">
                            <InputSearch
                                placeholder="Tìm kiếm theo họ tên/ mã số bệnh nhân/ CMND/ SĐT"
                                handleChange={(e) => setsSearchKeyword(e.target.value)}
                                className="spaces h-32"
                                value={searchKeyword}
                                handleSearch={() => {
                                    setSearchObject({ ...searchObject, keyword: searchKeyword })
                                }}
                            />
                        </div>
                        <Button
                            className="button-primary"
                            onClick={() => setOpenSearchAdvanceDialog(true)}
                        >
                            <OCTKTSVG path='/media/svg/icons/search.svg' svgClassName='spaces h-14 w-14' />
                            Tìm kiếm nâng cao
                        </Button>
                    </div>
                </div>
                <div className="ds-thb">
                    <OCTTable
                        id="danh-sach-thb"
                        data={truongHopBenhList}
                        columns={danhSachThbColumns}
                        searchObject={searchObject}
                        setSearchObject={(table) => {
                            handleChangePagination(table, setSearchObject)
                        }}
                        type={TYPE.SINGLE}
                        justFilter={true}
                        fixedColumnsCount={0}
                        setDataChecked={handleSelectTHB}
                        notDelete={true}
                        notEdit={true}
                        noToolbar={true}
                        totalPages={configTable?.totalPages}
                        totalElements={configTable?.totalElements}
                        numberOfElements={configTable?.numberOfElements}
                        uniquePrefix="truongHopBenhId"
                        unSelectedAll={true}
                    />
                </div>
                <div className="spaces px-10">
                    <strong>Chú thích: </strong>
                    <div className="d-flex align-items-center spaces mt-4 line-height-16">
                        <OCTKTSVG path="/media/svg/icons/check-circle-fill.svg" svgClassName="spaces w-16 h-16 mr-10 color-bright-cyan"/>
                        <span>Đã xác nhận</span>
                    </div>
                    <div className="d-flex align-items-center spaces mt-4 line-height-16">
                        <OCTKTSVG path="/media/svg/icons/exclamation-triangle-fill.svg" svgClassName="spaces w-16 h-16 mr-10 color-dark-orange"/>
                        <span>Chờ xác nhận</span>
                    </div>
                    <div className="d-flex align-items-center spaces mt-4 line-height-16">
                        <OCTKTSVG path="/media/svg/icons/exclamation-triangle-fill.svg" svgClassName="spaces w-16 h-16 mr-10 color-dark-red"/>
                        <span>Quá 7 ngày chưa xác nhận</span>
                    </div>
                    <div className="d-flex align-items-center spaces mt-4 line-height-16">
                        <OCTKTSVG path="/media/svg/icons/question-circle-fill.svg" svgClassName="spaces w-16 h-16 mr-10 color-steel-blue"/>
                        <span>Sai thông tin hành chính</span>
                    </div>
                    <div className="d-flex align-items-center spaces mt-4 line-height-16">
                        <OCTKTSVG path="/media/svg/icons/question-circle-fill.svg" svgClassName="spaces w-16 h-16 mr-10 color-green"/>
                        <span>Sai thông tin chẩn đoán</span>
                    </div>
                    <div className="spaces mt-4">
                        <span className="color-dark-red fs-18"> [CHỮ ĐỎ] </span>
                        &nbsp; Quá hạn nộp báo cáo hoặc phân loại
                    </div>
                    <div className="spaces mt-4">
                        <i className="text-primary">[IN NGHIÊNG]</i> &nbsp; Lưu nháp
                    </div>
                </div>
            </div>
            <div className="right-content-container">
                <div className="tt-header">
                    <div className="title-wrapper">
                        <OCTKTSVG path={"/media/svg/icons/info-square.svg"} svgClassName="spaces w-14 h-14 mr-10" />
                        <span className="title color-dark-red">Thông tin trường hợp bệnh</span>
                    </div>
                    <div className="d-flex spaces gap-10">
                        {isTuyenHuyenOrTuyenXa && isChuaXacNhanOrXacNhanSaiThongTin && (
                            <Button className={"button-primary"} onClick={() => setShouldOpenXacNhanThbDialog(true)}>
                                Xác nhận
                            </Button>
                        )}                 
                        {
                            dataRow?.truongHopBenh?.trangThaiPhanHoi !== TRANG_THAI_PHAN_HOI.DA_XN_DUNG && (
                                <>
                                    <Button
                                        className="button-primary"
                                        onClick={() => {
                                            setDataForm(dataRow)
                                            setOpenTruongHopBenhForm(true)
                                        }}
                                    >
                                        <OCTKTSVG path='/media/svg/icons/pencil-square.svg' svgClassName='spaces h-14 w-14 color-white' />
                                        Sửa
                                    </Button>
                                    <Button
                                        className="button-delete"
                                        onClick={() => setOpenDeleteTruongHopBenh(true)}
                                    >
                                        <OCTKTSVG path='/media/svg/icons/trash.svg' svgClassName='spaces h-14 w-14 color-white' />
                                        Xoá
                                    </Button>
                                </>
                            )
                        }
                        <DropdownButton 
                            title="Xuất báo cáo"
                            dropdownItems={exportedFileList}
                        />
                    </div>
                </div>
                <div className="tt-tabs">
                    <ThongTinThb dataRow={dataRow} />
                </div>
            </div>

            {openTruongHopBenhForm && (
                <NhapTruongHopBenhModal 
                    handleClose={() => setOpenTruongHopBenhForm(false)}
                    dataRow={dataForm}
                    updatePageData={getTruongHopBenhList}
                />
            )}

            {openSearchAdvanceDialog && (
                <TimKiemTHBNangCaoModal 
                    show={openSearchAdvanceDialog}
                    searchObject={searchObject}
                    setSearchObject={setSearchObject}
                    handleClose={() => setOpenSearchAdvanceDialog(false)} 
                />
            )}

            {shouldOpenXacNhanThbDialog && (
                 <ModalXacNhanTHB
                    handleClose={() => setShouldOpenXacNhanThbDialog(false)}
                    dataRow={dataRow}
                    updatePageData={getTruongHopBenhList}
                 />
            )}
            {
                openDeleteTruongHopBenh && (
                    <ConfirmDialog
                        show={openDeleteTruongHopBenh}
                        onCloseClick={() => setOpenDeleteTruongHopBenh(false)}
                        onCancelClick={() => setOpenDeleteTruongHopBenh(false)}
                        onYesClick={handleDeleteTruongHopBenh}
                        title="Xóa trường hợp bệnh"
                        message="Xác nhận xóa trường hợp bệnh"
                        yes="Xóa"
                        cancel="Hủy"
                    />

                )
            }
        </div>
    )
}

export default DanhSachTruongHopBenh;