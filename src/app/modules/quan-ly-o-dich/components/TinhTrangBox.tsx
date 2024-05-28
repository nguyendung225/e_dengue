import { OCTTextValidator } from "@oceantech/oceantech-ui"
import { Col, Row } from "react-bootstrap"
import LabelRequired from "../../component/LabelRequired"
import RadioGroup from "../../component/input-field/RadioGroup"

const TINH_TRANG_OPTIONS = [
    { name: "Điều trị ngoại trú", code: 1 },
    { name: "Điều trị nội trú", code: 2 },
    { name: "Ra viện", code: 3 },
    { name: "Tử vong", code: 4 },
    { name: "Chuyển viện", code: 5 },
    { name: "Tình trạng khác", code: 6 },
]

const TinhTrangBox = () => {
    return (
        <div className="section-container">
            <div className="spaces mb-10 fs-18 fw-bold text-uppercase color-dark-red">
                Tình trạng
            </div>
            <div className="border-top spaces pt-10">
                <Row>
                    <Col xs={12} sm={6} md={6} lg={6}>
                        <RadioGroup
                            name={""}
                            value={1}
                            groupContainerClassName="d-flex flex-column"
                            radioItemList={TINH_TRANG_OPTIONS}
                            handleChange={() => { }}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={6}>
                        <div>
                            <LabelRequired
                                label="Ngày khởi phát"
                                className="spaces fw-500 mb-5"
                            />
                            <OCTTextValidator
                                name="ngayKhoiPhat"
                                type="date"
                            />
                        </div>
                        <div className="spaces mt-10">
                            <LabelRequired
                                isRequired
                                label="Ngày nhập viện/khám"
                                className="spaces fw-500 mb-5"
                            />
                            <OCTTextValidator
                                name="ngayNhapVien"
                                type="date"
                            />
                        </div>
                        <div className="spaces mt-10">
                            <LabelRequired
                                isRequired
                                label="Ngày ra viện/chuyển viện/tử vong"
                                className="spaces fw-500 mb-5"
                            />
                            <OCTTextValidator
                                name="ngayRaVien"
                                type="date"
                            />
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default TinhTrangBox