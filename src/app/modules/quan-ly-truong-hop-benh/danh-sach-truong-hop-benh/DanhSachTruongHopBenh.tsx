import { OCTKTSVG, OCTTable } from "@oceantech/oceantech-ui";
import "./styles/danhSachThb.scss";
import { TYPE } from "../../utils/Constant";
import { danhSachThbColumns } from "./constants/constant";
import { Button } from "react-bootstrap";
import InputSearch from "../../component/input-field/InputSearch";
import ThongTinThb from "./components/ThongTinThb";
import NhapTruongHopBenhModal from './components/NhapTruongHopBenhModal';
import { useState } from "react";
import TimKiemTHBNangCaoModal from "./components/TimKiemTHBNangCaoModal";
import ModalXacNhanTHB from "./components/ModalXacNhanTHB";

const DanhSachTruongHopBenh = () => {
    const [openTruongHopBenhForm, setOpenTruongHopBenhForm] = useState<boolean>(false)
    const [openSearchAdvanceDialog, setOpenSearchAdvanceDialog] = useState<boolean>(false);
    const [openXacNhanTHB, setOpenXacNhanTHB] = useState<boolean>(false)
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
                            onClick={() => setOpenTruongHopBenhForm(true)}
                        >
                            <OCTKTSVG path='/media/svg/icons/plus.svg' svgClassName='spaces h-14 w-14 color-white' />
                            Thêm mới
                        </Button>
                    </div>
                    <div className="ds-search-box">
                        <div className="box-search">
                            <InputSearch
                                placeholder="Tìm kiếm theo họ tên/ mã số bệnh nhân/ CMND/ Số điện thoại"
                                handleChange={(e) => {
                                    // handleChangeSearchObj({ ...searchObj, keyword: e.target.value })
                                }}
                                className="spaces h-32"
                                // value={searchObj?.keyword}
                                handleSearch={() => {}}
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
                    id="profile"
                    data={[]}
                    columns={danhSachThbColumns}
                    // searchObject={searchObject}
                    // setSearchObject={setSearchObject}
                    type={TYPE.SINGLE}
                    fixedColumnsCount={0}
                    notDelete={true}
                    notEdit={true}
                    noToolbar={true}
                    // totalPages={totalPage}
                    // totalElements={totalElements}
                    // numberOfElements={numberOfElements}
                    // dataChecked={dataChecked}
                    // setDataChecked={setDataChecked}
                    unSelectedAll={true}
                />
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
                            onClick={() => setOpenXacNhanTHB(true)}
                        >
                            Xác nhận
                        </Button>
                        <Button
                            className="button-primary"
                            onClick={() => {}}
                        >
                            <OCTKTSVG path='/media/svg/icons/pencil-square.svg' svgClassName='spaces h-14 w-14 color-white' />
                            Sửa
                        </Button>
                        <Button
                            className="button-delete"
                            onClick={() => {}}
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
                    <ThongTinThb />
                </div>
            </div>
           {openTruongHopBenhForm && <NhapTruongHopBenhModal handleClose={() => setOpenTruongHopBenhForm(false)}/>}
           {openSearchAdvanceDialog && <TimKiemTHBNangCaoModal show={openSearchAdvanceDialog} handleClose={() => setOpenSearchAdvanceDialog(false)}/>}
           {openXacNhanTHB && <ModalXacNhanTHB handleClose={() => setOpenXacNhanTHB(false)}/>}
        </div>
    )
}

export default DanhSachTruongHopBenh;