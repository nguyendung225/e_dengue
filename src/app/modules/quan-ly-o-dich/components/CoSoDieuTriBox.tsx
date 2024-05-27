import { Col, Row } from "react-bootstrap"
import LabelRequired from "../../component/LabelRequired"
import { OCTAutocomplete, OCTTextValidator } from "@oceantech/oceantech-ui"

const CoSoDieuTriBox = () => {
    return (
        <div className="section-container">
            <div className="spaces mb-10 fs-18 fw-bold text-uppercase color-dark-red">
                Cơ sở điều trị
            </div>
            <div className="border-top">
                <Row>
                    <Col Col xs={12} sm={6} md={6} lg={6} className="spaces mt-10">
                        <LabelRequired
                            isRequired
                            label="Địa điểm"
                            className="spaces fw-500 mb-5"
                        />
                        <OCTAutocomplete
                            name="diaDiem"
                            options={[]}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={6} className="spaces mt-10">
                        <LabelRequired
                            isRequired
                            label="Cơ sở điều trị"
                            className="spaces fw-500 mb-5"
                        />
                        <OCTTextValidator
                            name="coSoDieuTri"
                            type="text"
                            placeholder="Nhập tên hoặc mã cơ sở"
                        />
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default CoSoDieuTriBox