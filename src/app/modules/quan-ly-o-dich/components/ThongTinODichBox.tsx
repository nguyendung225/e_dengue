import { Col, Row } from "react-bootstrap"
import LabelRequired from "../../component/LabelRequired"
import { OCTAutocomplete, OCTTextValidator } from "@oceantech/oceantech-ui"

export const ThongTinODichBox = () => {
    return (
        <>
            <div className="section-container">
                <div className="spaces mb-10 fs-18 fw-bold text-uppercase color-dark-red">
                    Thông tin ổ dịch
                </div>
                <div className="border-top">
                    <Row className="spaces mt-5">
                        <Col xs={12} sm={6} md={3} lg={3} className="spaces mt-5">
                            <LabelRequired
                                isRequired
                                label="Tỉnh/TP"
                                className="spaces fw-500 mb-5"
                            />
                            <OCTAutocomplete
                                name="trangThai"
                                options={[]}
                            />
                        </Col>
                        <Col xs={12} sm={6} md={3} lg={3} className="spaces mt-5">
                            <LabelRequired
                                isRequired
                                label="Quận/Huyện"
                                className="spaces fw-500 mb-5"
                            />
                            <OCTAutocomplete
                                name="trangThai"
                                options={[]}
                            />
                        </Col>
                        <Col xs={12} sm={6} md={3} lg={3} className="spaces mt-5">
                            <LabelRequired
                                isRequired
                                label="Phường/Xã"
                                className="spaces fw-500 mb-5"
                            />
                            <OCTAutocomplete
                                name="trangThai"
                                options={[]}
                            />
                        </Col>
                    </Row>
                    <Row className="spaces mt-10">
                        <Col xs={12} sm={6} md={3} lg={3} className="spaces mt-5">
                            <LabelRequired
                                isRequired
                                label="Trạng thái"
                                className="spaces fw-500 mb-5"
                            />
                            <OCTAutocomplete
                                name="trangThai"
                                options={[]}
                            />
                        </Col>
                        <Col xs={12} sm={6} md={3} lg={3} className="spaces mt-5">
                            <LabelRequired
                                isRequired
                                label="Tổ/thôn/ấp/khu vực"
                                className="spaces fw-500 mb-5"
                            />
                            <OCTTextValidator
                                name="thonXom"
                                placeholder="Tổ/thôn/ấp/khu vực..."
                            />
                        </Col>
                        <Col xs={12} sm={6} md={3} lg={3} className="spaces mt-5">
                            <LabelRequired
                                label="Ngày khởi phát ổ dịch"
                                className="spaces fw-500 mb-5"
                            />
                            <OCTTextValidator
                                name="ngayKhoiPhatODich"
                                type="date"
                            />
                        </Col>
                        <Col xs={12} sm={6} md={3} lg={3} className="spaces mt-5">
                            <LabelRequired
                                label="Phân độ lâm sàng/ Phân loại thể bệnh"
                                className="spaces fw-500 mb-5"
                            />
                            <OCTAutocomplete
                                name="phanLoai"
                                options={[]}
                            />
                        </Col>
                    </Row>
                    <Row className="spaces mt-10">
                        <Col xs={12} sm={6} md={9} lg={9} className="spaces mt-5">
                            <LabelRequired
                                label="Tìm kiếm trường hợp bệnh"
                                className="spaces fw-500 mb-5"
                            />
                            <OCTTextValidator
                                name="keyword"
                                type="text"
                                placeholder="Nhập mã hoặc họ tên bệnh nhân"
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

export default ThongTinODichBox