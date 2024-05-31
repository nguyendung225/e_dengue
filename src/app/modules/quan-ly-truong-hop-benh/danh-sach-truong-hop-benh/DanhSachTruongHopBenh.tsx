import { OCTKTSVG, OCTTable } from "@oceantech/oceantech-ui";
import "./styles/danhSachThb.scss";
import { TYPE } from "../../utils/Constant";
import { danhSachThbColumns } from "./constants/constant";
import { Button } from "react-bootstrap";
import InputSearch from "../../component/input-field/InputSearch";
import ThongTinThb from "./components/ThongTinThb";
import NhapTruongHopBenhModal from './components/NhapTruongHopBenhModal';
import { useContext, useEffect, useState } from "react";
import TimKiemTHBNangCaoModal from "./components/TimKiemTHBNangCaoModal";
import { toast } from "react-toastify";
import AppContext from "../../../AppContext";
import ModalXacNhanTHB from "./components/ModalXacNhanTHB";
import { SearchObjectModel } from "../models/TimKiemTruongHopBenhModels";
import { searchThbByPage } from "../tim-kiem-truong-hop-benh/services/TimKiemThbServices";
import { initTruongHopBenh, TruongHopBenh } from "./model/Model";
import { deleteTruongHopBenh, getThongTinTruongHopBenh } from "./servives/Services";
import { SEARCH_OBJECT_INIT } from "../tim-kiem-truong-hop-benh/constants/constants";
import ConfirmDialog from "../../component/confirm-dialog/ConfirmDialog";

const DanhSachTruongHopBenh = () => {
    const { setPageLoading } = useContext(AppContext);
    const [openTruongHopBenhForm, setOpenTruongHopBenhForm] = useState<boolean>(false);
    const [openDeleteTruongHopBenh, setOpenDeleteTruongHopBenh] = useState<boolean>(false);
    const [openSearchAdvanceDialog, setOpenSearchAdvanceDialog] = useState<boolean>(false);
    const [shouldOpenXacNhanThbDialog, setShouldOpenXacNhanThbDialog] = useState<boolean>(false);
    const [truongHopBenhList, setTruongHopBenhList] = useState<any>([]);
    const [searchObject, setSearchObject] = useState<SearchObjectModel>(SEARCH_OBJECT_INIT);
    const [dataRow, setDataRow] = useState<TruongHopBenh>(initTruongHopBenh);
    const [dataForm, setDataForm] = useState<TruongHopBenh>(dataRow);
    const [configTable, setConfigTable] = useState<any>({});
    const [searchKeyword, setsSearchKeyword] = useState<string>("");

    const getTruongHopBenhList = async () => {
        try {
            setPageLoading(true);
            const searchObjTemp: SearchObjectModel = {
                ...searchObject,
                gioiTinh: searchObject.gioiTinh?.code,
                ngheNghiepId: searchObject.ngheNghiepId?.id,
                phanLoai: searchObject.phanLoai?.code,
                listTinhTrangHienNay: searchObject.listTinhTrangHienNay?.map((item: any) => item.code),
                tinhId: searchObject.tinhId?.id,
                huyenId: searchObject.huyenId?.id,
                xaId: searchObject.xaId?.id,
                coSoCreateId: searchObject.coSoCreateId?.id,
                kqXetNghiem: searchObject.kqXetNghiem?.id,
                donViThucHienXn: searchObject.donViThucHienXn?.id,
                coSoDieuTriId: searchObject.coSoDieuTriId?.id
            }
            const { data } = await searchThbByPage(searchObjTemp);
            const dataTemp = data?.data?.data.map((item: any, index: number) => {
                return index === 0 ? {...item, isChecked: true} : item;
            })
            setTruongHopBenhList(dataTemp);
            getThongTinChiTietTHB(dataTemp?.[0]?.truongHopBenhId);
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

    const handleDeleteTruongHopBenh = async () => {
        const id = dataRow?.truongHopBenh?.truongHopBenhId
        try {
            setPageLoading(true);
            id && await deleteTruongHopBenh(id);
            getTruongHopBenhList();
            setOpenDeleteTruongHopBenh(false);
        } catch (error) {
            console.error(error);
            toast.error(error as string);
        } finally {
            setPageLoading(false);
        }
    }

    const formatData = (data: any) => {
        let newData = {
            truongHopBenh: {
                ...data?.truongHopBenh,
                capDoBenh: {
                    id: data?.truongHopBenh.capDoBenhId,
                    tenCapDo: data?.truongHopBenh.capDoBenhTen
                },
                benhVienChuyenToi: {
                    id: data?.truongHopBenh.benhVienChuyenToiId,
                    tenCoSo: data?.truongHopBenh.benhVienChuyenToiTen
                },
                donViXetNghiemObject: {
                    id: data?.truongHopBenh.donViXetNghiem,
                    tenCoSo: data?.truongHopBenh.donViXetNghiemTen
                },
                donViCongTacNbc: {
                    id: data?.truongHopBenh.donViCongTacNbcId,
                    tenCoSo: data?.truongHopBenh.donViCongTacNbcTen
                },
                coSoDieuTri: {
                    id: data?.truongHopBenh.coSoDieuTriId,
                    tenCoSo: data?.truongHopBenh.coSoDieuTriTen
                },
                coSoQuanLy: {
                    id: data?.truongHopBenh.coSoQuanLyId,
                    tenCoSo: data?.truongHopBenh.coSoQuanLyTen
                }
            },
            doiTuongMacBenh: {
                ...data?.doiTuongMacBenh,
                ngheNghiep: {
                    id: data?.doiTuongMacBenh.ngheNghiepId,
                    tenNghe: data?.doiTuongMacBenh.ngheNghiepTen
                },
                danToc: {
                    id: data?.doiTuongMacBenh.danTocId,
                    tenDanToc: data?.doiTuongMacBenh.danTocTen
                },
                tinhHienNay: {
                    id: data?.doiTuongMacBenh.tinhIdHienNay,
                    tenTinh: data?.doiTuongMacBenh.tinhTenHienNay
                },
                huyenHienNay: {
                    id: data?.doiTuongMacBenh.huyenIdHienNay,
                    tenHuyen: data?.doiTuongMacBenh.huyenTenHienNay
                },
                xaHienNay: {
                    xaId: data?.doiTuongMacBenh.xaIdHienNay,
                    tenXa: data?.doiTuongMacBenh.xaTenHienNay
                },
                tinhThuongTru: {
                    id: data?.doiTuongMacBenh.tinhIdThuongTru,
                    tenTinh: data?.doiTuongMacBenh.tinhTenThuongTru
                },
                huyenThuongTru: {
                    id: data?.doiTuongMacBenh.huyenIdThuongTru,
                    tenHuyen: data?.doiTuongMacBenh.huyenTenThuongTru
                },
                xaThuongTru: {
                    xaId: data?.doiTuongMacBenh.xaIdThuongTru,
                    tenXa: data?.doiTuongMacBenh.xaTenThuongTru
                }
            }

        };
        return newData
    }

    const getThongTinChiTietTHB = async (id: string) => {
        try {
            setPageLoading(true);
            const rest = await getThongTinTruongHopBenh(id);
            setDataRow(formatData(rest.data.data));
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
        getTruongHopBenhList();
    }, [searchObject])


    return (
        <div className="page-container">
            <div className="left-content-container">
                <div>
                    <div className="ds-header">
                        <div className="d-flex align-items-center">
                            <OCTKTSVG path={'/media/svg/icons/List ul.svg'} svgClassName="spaces w-14 h-14 mr-10" />
                            <span className="title">
                                Danh sách
                            </span>
                        </div>
                        <Button
                            className="button-primary"
                            onClick={() => {
                                setDataForm(initTruongHopBenh)
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
                                placeholder="Tìm kiếm theo họ tên/ mã số bệnh nhân/ CMND/ Số điện thoại"
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
                <OCTTable
                    id="danh-sach-thb"
                    data={truongHopBenhList}
                    columns={danhSachThbColumns}
                    searchObject={searchObject}
                    setSearchObject={setSearchObject}
                    type={TYPE.SINGLE}
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
                </div>
            </div>
            <div className="right-content-container">
                <div className="tt-header">
                    <div className="title-wrapper">
                        <OCTKTSVG path={"/media/svg/icons/info-square.svg"} svgClassName="spaces w-14 h-14 mr-10" />
                        <span className="title">Thông tin trường hợp bệnh</span>
                    </div>
                    <div className="d-flex spaces gap-10">
                        <Button
                            className="button-primary"
                            onClick={() => setShouldOpenXacNhanThbDialog(true)}
                        >
                            Xác nhận
                        </Button>
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
                        <Button
                            className="button-primary"
                            onClick={() => {}}
                        >
                            <OCTKTSVG path='/media/svg/icons/plus.svg' svgClassName='spaces h-14 w-14 color-white' />
                            Thêm
                        </Button>
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
                <ModalXacNhanTHB handleClose={() => setShouldOpenXacNhanThbDialog(false)} />
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