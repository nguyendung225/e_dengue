import { OCTKTSVG, OCTTextValidator } from "@oceantech/oceantech-ui"
import { Button, Col, Row } from "react-bootstrap"
import Autocomplete from "../component/input-field/autocomplete/Autocomplete"
import TableGrouping from "../component/table/table-grouping/TableGrouping"
import { getListTinh } from "../services"
import { columnBaoCaoTuan, columnTotalBaoCao } from "./constant/constants"

const BaoCaoTuan = () => {

    return (
        <div className="spaces mt-15">
            <div className="section-container">
                <div className="d-flex align-items-center justify-content-between">
                    <div className="spaces mb-15 fs-18 fw-bold text-uppercase color-dark-red">
                        Tìm kiếm thông tin
                    </div>
                    <Button
                        className="button-primary"
                        type="submit"
                    >
                        <OCTKTSVG
                            path="/media/svg/icons/search.svg"
                            svgClassName="spaces h-14 w-14 color-white"
                        />
                        Tìm kiếm
                    </Button>
                </div>
                <Row>
                    <Col xs={3} className="spaces mt-5">
                        <Autocomplete
                            lable="Tỉnh/T.Phố"
                            searchFunction={getListTinh}
                            multiCheckBox
                            urlData='data.data'
                            getOptionLabel={(option) => option?.tenTinh}
                            getOptionValue={(option) => option?.tenTinh}
                            options={[]}
                            name='doiTuongMacBenh.tinhThuongTru'
                            searchObject={{}}
                        />
                    </Col>
                    <Col xs={3} className="spaces mt-5">
                        <Autocomplete
                            lable="Quận/Huyện"
                            searchFunction={getListTinh}
                            multiCheckBox
                            urlData='data.data'
                            getOptionLabel={(option) => option?.tenTinh}
                            getOptionValue={(option) => option?.tenTinh}
                            options={[]}
                            name='doiTuongMacBenh.tinhThuongTru'
                            searchObject={{}}
                        />
                    </Col>
                    <Col xs={3} className="spaces mt-5">
                        <Autocomplete
                            lable="Xã/Phường"
                            searchFunction={getListTinh}
                            multiCheckBox
                            urlData='data.data'
                            getOptionLabel={(option) => option?.tenTinh}
                            getOptionValue={(option) => option?.tenTinh}
                            options={[]}
                            name='doiTuongMacBenh.tinhThuongTru'
                            searchObject={{}}
                        />
                    </Col>
                    <Col xs={3} className="spaces mt-5">
                        <Autocomplete
                            lable="Năm"
                            searchFunction={getListTinh}
                            urlData='data.data'
                            getOptionLabel={(option) => option?.tenTinh}
                            options={[]}
                            name='doiTuongMacBenh.tinhThuongTru'
                            searchObject={{}}
                        />
                    </Col>
                    <Col xs={3} className="spaces mt-5">
                        <Autocomplete
                            lable="Tuần"
                            searchFunction={getListTinh}
                            urlData='data.data'
                            getOptionLabel={(option) => option?.tenTinh}
                            options={[]}
                            name='doiTuongMacBenh.tinhThuongTru'
                            searchObject={{}}
                        />
                    </Col>
                    <Col xs={3} className="spaces mt-5">
                        <OCTTextValidator
                            lable="Từ ngày"
                            type="date"
                            isRequired
                            name="oDich.tenODich"
                        />
                    </Col>
                    <Col xs={3} className="spaces mt-5">
                        <OCTTextValidator
                            lable="Đến ngày"
                            type="date"
                            isRequired
                            name="oDich.tenODich"
                        />
                    </Col>
                </Row>
            </div>
            <div className="section-container spaces mt-15">
                <div className="d-flex align-items-center justify-content-between">
                    <div className="spaces mb-15 fs-18 fw-bold text-uppercase color-dark-red">
                        DANH SÁCH BÁO CÁO TUẦN
                    </div>
                    <Button
                        className="button-primary"
                        type="submit"
                    >
                        In Báo cáo
                    </Button>
                </div>
                <div className="bg-white spaces mt-10 flex-1">
                    <TableGrouping
                        id="reportDetail"
                        columns={columnBaoCaoTuan}
                        data={[{}]}
                        className="table-custom"
                        columnsTotal={columnTotalBaoCao}
                        showTotalRow
                    />
                </div>
            </div>
        </div>
    )
}

export default BaoCaoTuan